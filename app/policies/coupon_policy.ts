import User from '#models/user'
import Coupon from '#models/coupon'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class CouponPolicy extends AdminBasePolicy {
    viewList(user: User): AuthorizerResponse {
        return false
    }
    show(user: User): AuthorizerResponse {
        return false
    }
    create(user: User): AuthorizerResponse {
        return false
    }

    edit(user: User,coupon:Coupon): AuthorizerResponse {
        return user.id===coupon.user_id
    }

    delete(user: User): AuthorizerResponse {
        return false
    }
}