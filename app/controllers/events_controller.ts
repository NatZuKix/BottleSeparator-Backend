import type { HttpContext } from '@adonisjs/core/http'
import Event from "#models/event";
import EventPolicy from '#policies/event_policy';
import Role from '../../Enums/Roles.js';

export default class EventsController {
  async list({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const listEvent = user.role === Role.USER ? await Event.query()
        .where("is_showed", true)
        .where('expired_date', '>', new Date())
        : await Event.query()
      return response.json(listEvent)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, response, auth }: HttpContext) {
    try {
      const id = params.id
      const user = auth.getUserOrFail()
      const event = user.role === Role.USER ? await Event.query()
            .where('id', id)
            .where("is_showed", true)
            .where('expired_date', '>', new Date())
            .firstOrFail()
        : Event.query().where('id', id).firstOrFail()
      return response.ok(event)
    } catch (error) {
      console.log(error.status)
      return response.status(500).json({ error: error.message })
    }
  }

  async create({ request, response, bouncer }: HttpContext) {
    try {
      //ไม่มี validate
      const newEvent = new Event()
      await bouncer.with(EventPolicy).authorize('create')
      newEvent.title = request.input('title')
      newEvent.description = request.input('description')
      newEvent.point_used = request.input('point_used')
      newEvent.expired_at = request.input('expired_at')
      newEvent.is_showed = request.input('is_showed')
      await newEvent.save()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async update({ request, response, params, bouncer }: HttpContext) {
    //update ตามที่ส่ง
    try {
      const id = params.id
      const newEvent = await Event.query().where('id', id).firstOrFail()
      newEvent.title = request.input('title')
      newEvent.description = request.input('description')
      newEvent.point_used = request.input('point_used')
      newEvent.expired_at = request.input('expired_at')
      newEvent.is_showed = request.input('is_showed')

      await bouncer.with(EventPolicy).authorize('edit')
      await newEvent.save()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async destroy({ response, params, bouncer }: HttpContext) {
    try {
      const id = params.id
      await bouncer.with(EventPolicy).authorize('delete')
      const deleteEvent = await Event.query().where('id', id).firstOrFail()
      await deleteEvent.delete()
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}