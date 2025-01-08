import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class UserPolicy extends AdminBasePolicy {
    viewList(user: User): AuthorizerResponse {
        return false
    }
    show(user:User,targetUser:User){
        return (user.id===targetUser.id)
    }
}