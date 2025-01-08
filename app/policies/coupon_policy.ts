import User from '#models/user'
import Coupon from '#models/coupon'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class CouponPolicy extends AdminBasePolicy {
  
}