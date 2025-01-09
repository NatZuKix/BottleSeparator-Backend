import User from '#models/user'
import Event from '#models/event'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class EventPolicy extends AdminBasePolicy {
        viewList(user: User): AuthorizerResponse { 
            return true
        }
        
        show(user: User,event:Event): AuthorizerResponse { 
            return true
        } 
          
        create(user: User): AuthorizerResponse { 
            return false
        } 
        edit(user: User): AuthorizerResponse {
            return false
        }
    
        delete(user: User): AuthorizerResponse {
            return false
        }
}