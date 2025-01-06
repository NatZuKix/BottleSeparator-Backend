import UsersController from '#controllers/users_controller' 
import router from '@adonisjs/core/services/router'
// import { middleware } from '#start/kernel'  
router.group(()=>{ 
    router.group(()=>{ 
        router.post('/login',[UsersController,'login']).as('users.login') 
        router.post('/register',[UsersController,'register']).as('users.register') 
})}).prefix('/api') 