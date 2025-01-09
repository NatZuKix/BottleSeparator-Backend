import CouponsController from '#controllers/coupons_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(()=>{ 
        router.get('/coupons',[CouponsController,'listCouponByUserId']).as('coupons.couponByUserId')
        // router.get('/coupon/:id',[CouponsController,'show']).as('coupons.couponById')

        
        router.put('/coupon/:id',[CouponsController,'activateCoupon']).as('coupons.activateCoupon')
        // router.delete('/coupon/:id',[CouponsController,'destroy']).as('coupons.deleteCoupon')
}).prefix('/api').use(middleware.auth())