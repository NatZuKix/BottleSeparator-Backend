import type { HttpContext } from '@adonisjs/core/http'
import TrashRecord from '#models/trash_record'
import TrashPolicy from '#policies/trash_policy'
import User from '#models/user'
import Trash_Type from '../../Enums/Trash_Type.js'

export default class TrashRecordersController {
  async list({ response, bouncer }: HttpContext) {
    try {
      await bouncer.with(TrashPolicy).authorize('viewList')
      const listTrashRecord = await TrashRecord.query()
            // .preload('user',(queryUser)=>{
            //   queryUser.select("name","username","role","credit")
            // })
            .select("trashType", "redeemCode", "user", "createdAt")
      return response.json(listTrashRecord)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, response, bouncer }: HttpContext) {
    try {
      const id = params.id
      await bouncer.with(TrashPolicy).authorize('show')
      const trashRecord = await TrashRecord.query().where('id', id)
        .preload('user', (queryUser) => {
          queryUser.select("name", "username", "role", "credit")
        }).firstOrFail()
      return response.ok(trashRecord)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async create({ request, response, bouncer }: HttpContext) {
    try {
      await bouncer.with(TrashPolicy).authorize('create')
      const newTrashRecord = new TrashRecord()
      newTrashRecord.user_id = request.input('user_id')
      newTrashRecord.trash_type = request.input('trash_type')
      newTrashRecord.redeem_code = request.input('redeem_code')
      await newTrashRecord.save()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async activate({ request, response, bouncer }: HttpContext) {
    try {
      const { redeem_code, user_id } = request.all()
      const activateTrashRecord = await TrashRecord.query().where('user_id', user_id).where('redeem_code', redeem_code).firstOrFail()
      const user = await User.query().where('id', user_id).firstOrFail()
      await bouncer.with(TrashPolicy).authorize('activate')
      activateTrashRecord.is_redeemed != activateTrashRecord.is_redeemed
      if (activateTrashRecord.trash_type === Trash_Type.BOTTLE) {
        user.credit += 1
      } else if (activateTrashRecord.trash_type === Trash_Type.CAN) {
        user.credit += 2
      }
      await activateTrashRecord.save()
      await user.save()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async destroy({ response, params, bouncer }: HttpContext) {
    try {
      const id = params.id
      const deleteTrashRecord = await TrashRecord.query().where('id', id).firstOrFail()

      await bouncer.with(TrashPolicy).authorize('delete')
      await deleteTrashRecord.delete()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}