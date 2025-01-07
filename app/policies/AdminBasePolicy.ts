import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Role from '../../contact/Role.js'
export default class AdminBasePolicy extends BasePolicy { 
 async before(user: User | null, action: string, ...params: any[]) { 
 if(user?.role == Role.ADMIN){ 
 return true
 } 
 }
 async admin_user(user: User) {
    return user.role === Role.ADMIN || user.role === Role.USER ;
   }
 async admin_only(user: User) {
    return user.role === Role.ADMIN; 
  }
}