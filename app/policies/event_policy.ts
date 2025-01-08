import User from '#models/user'
import Event from '#models/event'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './AdminBasePolicy.js'

export default class EventPolicy extends AdminBasePolicy {
        viewList(user: User): AuthorizerResponse { 
            return false
        }
        
        show(user: User,event:Event): AuthorizerResponse { 
            return false
        } 
          
        create(user: User): AuthorizerResponse { 
            return false
        } 
      
        // edit(user: User,movie: Movie): AuthorizerResponse { 
        // return false
        // } 
}