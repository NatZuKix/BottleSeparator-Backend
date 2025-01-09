import User from '#models/user'
import Coupon from '#models/coupon'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class CouponPolicy extends AdminBasePolicy {
    viewList(user: User): AuthorizerResponse {
        return true
    }
    show(user: User,coupon:Coupon): AuthorizerResponse {
        return user.id===coupon.user_id
    }
    generate(user: User): AuthorizerResponse {
        return true
    }

    edit(user: User,user_id:Number): AuthorizerResponse {
        return user.id===user_id
    }

    activate(user: User,coupon:Coupon): AuthorizerResponse {
        return user.id===coupon.user_id
    }


    delete(user: User): AuthorizerResponse {
        return false
    }
}