import User from '#models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class UserPolicy extends AdminBasePolicy {
    viewList(user: User): AuthorizerResponse {
        return false
    }
    show(user:User,targetUser:Number){
        return user.id==targetUser
    }
}