import type { HttpContext } from '@adonisjs/core/http'
import Coupon from '#models/coupon'
import AdminBasePolicy from '#policies/AdminBasePolicy'

export default class CouponsController {
    async listCouponByUserId({ response,params }: HttpContext){
        try {
            const user_id=params.userId
            const listCoupon = await Coupon.query().where('id',user_id)
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
    
      async show({ params, response }: HttpContext){
        try {
            const id = params.id
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
        try {
            const newCoupon = new Coupon()
            newCoupon.user_id = request.input('user_id')
            newCoupon.event_id = request.input('event_id')
            newCoupon.is_used = request.input('is_used')
            newCoupon.expired_date = request.input('expired_date')

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await newCoupon.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async update({ request, response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const newCoupon = await Coupon.query().where('id',id).firstOrFail()
            newCoupon.user_id = request.input('user_id')
            newCoupon.event_id = request.input('event_id')
            newCoupon.is_used = request.input('is_used')
            newCoupon.expired_date = request.input('expired_date')

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await newCoupon.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async destroy({ response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const deleteCoupon = await Coupon.query().where('id',id).firstOrFail()

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await deleteCoupon.delete()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
}