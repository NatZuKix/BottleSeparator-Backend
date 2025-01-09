import type { HttpContext } from '@adonisjs/core/http'
import Coupon from '#models/coupon'
import CouponPolicy from '#policies/coupon_policy'
import Event from '#models/event'
import { DateTime } from 'luxon'
import { log } from 'console'


export default class CouponsController {
  async listCouponByUserId({ response, auth, bouncer, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const coupon_type = request.input('type', 'active')
    await bouncer.with(CouponPolicy).authorize('viewList')
    try {
      let listCoupon: Coupon[] = []

      if (String(coupon_type).toLocaleLowerCase() == 'active') {
        const now = DateTime.now()
        listCoupon = await Coupon.query().where('user_id', user.id).where('is_activated', false).where('expired_date', '>', now.toSQL())
          .preload('event', (queryUser) => {
            queryUser.select("title", 'id')
          })
      } else if (String(coupon_type).toLocaleLowerCase() == 'used') {
        listCoupon = await Coupon.query().where('user_id', user.id).where('is_activated', true)
          .preload('event', (queryUser) => {
            queryUser.select("title", 'id')
          })
      } else if (String(coupon_type).toLocaleLowerCase() == 'expired') {
        const now = DateTime.now()
        listCoupon = await Coupon.query().where('user_id', user.id).where('is_activated', false).where('expired_date', '<', now.toSQL())
          .preload('event', (queryUser) => {
            queryUser.select("title", 'id')
          })
      } else {
        return response.badRequest('invalid coupontype')
      }

      return response.ok(listCoupon)
    } catch (error) {
      return response.internalServerError(error.messages)
    }
  }

  async show({ params, response, bouncer }: HttpContext) {
    try {
      const id = params.id
      const coupon = await Coupon.query().where('id', id)
        .preload('user', (queryUser) => {
          queryUser.select("name", "username", "role", "credit")
        })
        .preload('event', (queryUser) => {
          queryUser.select("*")
        }).firstOrFail()


      try {
        await bouncer.with(CouponPolicy).authorize('show', coupon)
      }
      catch (error) {
        response.forbidden(error.messages)
      }

      return response.ok(coupon)
    } catch (error) {
      return response.internalServerError(error.messages)
    }
  }

  async generateCoupon({ response, bouncer, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await bouncer.with(CouponPolicy).authorize('generate')
    const { id } = params
    const event = await Event.query().where('id', id).firstOrFail()
    try {
      if (event.expired_at) {
        if (event.expired_at > DateTime.now()) {
          return response.badRequest('this event is expired')
        }
      }
      if (event.quantity <= 0) {
        return response.badRequest('The coupon has been redeemed')
      }
      const coupons = await Coupon.query().where('user_id', user.id).where('event_id', event.id).first()
      if (coupons) {
        return response.badRequest('You have already redeemed this coupon.')
      }

      if(user.credit< event.point_used){
        return response.badRequest('No point to redeem')
      }

      let coupon: Coupon
      if (event.expired_at) {
        coupon = await Coupon.create({ user_id: user.id, event_id: event.id, expired_date: event.expired_at })
      } else {
        // สร้างตัวแปร `DateTime` ของวันที่และเวลาปัจจุบัน
        const currentDateTime = DateTime.now();

        // เพิ่ม 7 วันไปยังวันที่ปัจจุบัน
        const futureDateTime = currentDateTime.plus({ days: 7 });


        // สร้าง Coupon record
        coupon = await Coupon.create({
          user_id: user.id,
          event_id: event.id,
          expired_date: futureDateTime // เก็บ Date object หรือ ISO String ลงใน expired_date
        });
      }
      user.credit = user.credit-event.point_used
      event.quantity -= 1
      await event.save()
      await user.save()
      return response.ok(coupon)
    } catch (err) {
      return response.internalServerError(err)
    }

  }

  async activateCoupon({ response, params, bouncer }: HttpContext) {
    const id = params.id
    const coupon = await Coupon.query().where('id', id).firstOrFail()
    await bouncer.with(CouponPolicy).authorize('activate', coupon)
    try {
      if (DateTime.now() > coupon.expired_date) {
        return response.status(410).json({ error: "Expired" })
      }
      if (coupon.is_activated) {
        return response.status(409).json({ error: "already activate" })
      }
      coupon.is_activated = true;

      await coupon.save()
      return response.ok('Coupon activate successfuly.')
    } catch (error) {
      return response.internalServerError(error.messages)
    }
  }

  async destroy({ response, params, bouncer }: HttpContext) {
    try {
      const id = params.id
      await bouncer.with(CouponPolicy).authorize('delete')
      const deleteCoupon = await Coupon.query().where('id', id).firstOrFail()
      await deleteCoupon.delete()
    } catch (error) {
      return response.internalServerError(error.messages)
    }
  }
}