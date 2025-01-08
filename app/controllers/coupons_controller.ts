import type { HttpContext } from '@adonisjs/core/http'
import Coupon from '#models/coupon'
import CouponPolicy from '#policies/coupon_policy'
import Event from '#models/event'
import { error } from 'console'
import { DateTime } from 'luxon'

export default class CouponsController {
    async listCouponByUserId({ response,auth,bouncer }: HttpContext){
        try {
            const user = auth.getUserOrFail()
            await bouncer.with(CouponPolicy).authorize('viewList')
            const listCoupon = await Coupon.query().where('id',user.id)
            .preload('user',(queryUser)=>{
              queryUser.select("name","username","role","credit")
            })
            .preload('event',(queryUser)=>{
              queryUser.select("*")
            })
            return response.json(listCoupon)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async show({ params, response,bouncer,auth }: HttpContext){
        try {
            const id = params.id
            await auth.getUserOrFail()
            await bouncer.with(CouponPolicy).authorize('show')
            const coupon = await Coupon.query().where('id',id)
            .preload('user',(queryUser)=>{
              queryUser.select("name","username","role","credit")
            })
            .preload('event',(queryUser)=>{
              queryUser.select("*")
            }).firstOrFail()
            return response.ok(coupon)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async create({ request, response,bouncer }: HttpContext){
        await bouncer.with(CouponPolicy).authorize('create')
        try {
            const newCoupon = new Coupon()
            newCoupon.user_id = request.input('user_id')
            newCoupon.event_id = request.input('event_id')
            newCoupon.expired_date = request.input('expired_date')

            const event = await Event.query().where('id',newCoupon.event_id).firstOrFail()
            event.quantity-=1
            await newCoupon.save()
            await event.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async activateCoupon({ response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const coupon = await Coupon.query().where('id',id).firstOrFail()
            const event = await Event.query().where('id',coupon.event_id).firstOrFail()
            if (event.quantity<1||coupon.is_activated==true||DateTime.now()>event.expired_at) {
              return response.status(410).json({ error: "Expired," })
            }
            coupon.is_activated=true;
            await bouncer.with(CouponPolicy).authorize('edit',coupon!)
            await coupon.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async destroy({ response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const deleteCoupon = await Coupon.query().where('id',id).firstOrFail()

            await bouncer.with(CouponPolicy).authorize('delete')
            await deleteCoupon.delete()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
}