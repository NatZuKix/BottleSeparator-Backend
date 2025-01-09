import OauthController from '#controllers/oauths_controller' 
import router from '@adonisjs/core/services/router' 

router.group(()=>{ 
    router.group(()=>{ 
        router.get('/auth/microsoft',[OauthController,'redirectToMicrosoft']).as('oauth.redirect') 
        router.post('/auth/microsoft/callback',[OauthController,'handleMicrosoftCallback']).as('oauth.callback') 
      
    }).prefix('/public') 
}).prefix('/api') 
