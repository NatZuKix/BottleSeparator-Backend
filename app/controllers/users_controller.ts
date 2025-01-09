import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '#validators/user'


export default class UsersController {
    async login({ auth, request }: HttpContext) {
        const { username, password } = request.all()
        const user = await User.verifyCredentials(username, password)
        // to generate a token 
        return await auth.use('jwt').generate(user)
    }

    async register({ request, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(registerUserValidator)
            //console.log(payload.name);
            
            await User.create({ username: payload.username, password: payload.password, name: payload.name,oid:null})
            
            response.ok('The user is register successfully.')
        } catch (error) {
            response.badRequest(error.messages)
        }
    }
    async findUserById({ response,params,auth,bouncer }: HttpContext){
        const user_id=params.id
        await bouncer.with('UserPolicy').authorize('show',params.id!)
        try {
            
            
            const user = await User
                .query().where('id',user_id)
                .preload('trashs',(query)=>
                    query.select('trash_type','redeem_code','createdAt','user_id'))
                .firstOrFail()
            return response.json(user)
        } catch (error) {
          return response.internalServerError(error.messages)
        }
      }
}