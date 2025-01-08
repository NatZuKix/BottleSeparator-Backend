import TrashRecordersController from '#controllers/trash_recorders_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(()=>{ 
        router.get('/trashs',[TrashRecordersController,'list']).as('trashs.trashs')
        router.get('/trash/:id',[TrashRecordersController,'show']).as('trashs.trashById')

        router.post('/trash',[TrashRecordersController,'create']).as('trashs.createTrash')
        // router.put('/trash/:id',[TrashRecordersController,'update'])
        router.delete('/trash/:id',[TrashRecordersController,'destroy']).as('trashs.deleteTrash')
}).prefix('/api').use(middleware.auth())