import type { HttpContext } from '@adonisjs/core/http'
import TrashRecord from '#models/trash_record'
import AdminBasePolicy from '#policies/AdminBasePolicy'

export default class TrashRecordersController {
    async list({ response }: HttpContext){
        try {
            const listTrashRecord = await TrashRecord.query()
            return response.json(listTrashRecord)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async show({ params, response }: HttpContext){
        try {
            const id = params.id
            const trashRecord = await TrashRecord.query().where('id',id).firstOrFail()
            return response.ok(trashRecord)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async create({ request, response,bouncer }: HttpContext){
        try {
            const newTrashRecord = new TrashRecord()
            newTrashRecord.user_id = request.input('user_id')
            newTrashRecord.trash_type = request.input('trash_type')
            newTrashRecord.redeem_code = request.input('redeem_code')
            newTrashRecord.is_redeemed = request.input('is_redeemed')

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await newTrashRecord.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
    //   async update({ request, response,params,bouncer }: HttpContext){
    //     try {
    //         const id = params.id
    //         const newTrashRecord = await TrashRecord.query().where('id',id).firstOrFail()
    //         newTrashRecord.user_id = request.input('user_id')
    //         newTrashRecord.trash_type = request.input('trash_type')
    //         newTrashRecord.redeem_code = request.input('redeem_code')
    //         newTrashRecord.is_redeemed = request.input('is_redeemed')

    //         await bouncer.with(AdminBasePolicy).authorize('admin_only')
    //         await newTrashRecord.save()
    //     } catch (error) {
    //       return response.status(500).json({ error: error.message })
    //     }
    //   }
    
      async destroy({ response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const deleteTrashRecord = await TrashRecord.query().where('id',id).firstOrFail()

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await deleteTrashRecord.delete()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
}