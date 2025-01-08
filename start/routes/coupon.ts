import CouponsController from '#controllers/coupons_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(()=>{ 
        router.get('/coupons/:userId',[CouponsController,'listCouponByUserId']).as('coupons.couponByUserId')
        router.get('/coupon/:id',[CouponsController,'show']).as('coupons.couponById')

        router.post('/coupon',[CouponsController,'create']).as('coupons.createCoupon')
        router.put('/coupon/:id',[CouponsController,'update']).as('coupons.updateCoupon')
        router.delete('/coupon/:id',[CouponsController,'destroy']).as('coupons.deleteCoupon')
}).prefix('/api').use(middleware.auth())