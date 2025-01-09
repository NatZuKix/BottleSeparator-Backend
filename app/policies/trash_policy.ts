import User from '#models/user'
import TrashRecord from '#models/trash_record'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class TrashPolicy extends AdminBasePolicy {
    viewList(user: User): AuthorizerResponse {
        return false
    }
    show(user: User): AuthorizerResponse {
        return false
    }
    create(user: User): AuthorizerResponse {
        return false
    }

    edit(user: User): AuthorizerResponse {
        return false
    }

    activate(user: User): AuthorizerResponse {
        return true
    }

    delete(user: User): AuthorizerResponse {
        return false
    }
}