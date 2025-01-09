import EventsController from '#controllers/events_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import CouponsController from '#controllers/coupons_controller'
router.group(()=>{ 
        router.get('/events/',[EventsController,'list']).as('events.eventByUserId')
        router.post('/event/:id/coupon',[CouponsController,'generateCoupon']).as('events.generateCoupon')

        // router.post('/event',[EventsController,'create']).as('events.createEvent')
        // router.put('/event/:id',[EventsController,'update']).as('events.updateEvent')
        // router.delete('/event/:id',[EventsController,'destroy']).as('events.deleteEvent')
}).prefix('/api').use(middleware.auth())