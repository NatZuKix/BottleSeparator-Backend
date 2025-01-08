import UsersController from '#controllers/users_controller' 
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
// import { middleware } from '#start/kernel'  

router.group(()=>{ 
    router.group(()=>{ 
        router.post('/login',[UsersController,'login']).as('users.login') 
        router.post('/register',[UsersController,'register']).as('users.register') 
    }).prefix('/public')
    router.group(()=>{ 
        router.get('/user/:id',[UsersController,'findUserById']).as('users.user')
    }).use(middleware.auth())
}).prefix('/api') 