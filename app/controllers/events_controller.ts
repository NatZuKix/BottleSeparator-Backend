import type { HttpContext } from '@adonisjs/core/http'
import Event from "#models/event";
import AdminBasePolicy from '#policies/AdminBasePolicy';

export default class EventsController {
    async list({ response }: HttpContext){
        try {
            const listEvent = await Event.query()
            return response.json(listEvent)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async show({ params, response }: HttpContext){
        try {
            const id = params.id
            const event = await Event.query().where('id',id).firstOrFail()
            return response.ok(event)
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async create({ request, response,bouncer }: HttpContext){
        try {
            const newEvent = new Event()
            newEvent.title = request.input('title')
            newEvent.description = request.input('description')
            newEvent.point_used = request.input('point_used')
            newEvent.expired_at = request.input('expired_at')
            newEvent.is_showed = request.input('is_showed')

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await newEvent.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async update({ request, response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const newEvent = await Event.query().where('id',id).firstOrFail()
            newEvent.title = request.input('title')
            newEvent.description = request.input('description')
            newEvent.point_used = request.input('point_used')
            newEvent.expired_at = request.input('expired_at')
            newEvent.is_showed = request.input('is_showed')

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await newEvent.save()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
    
      async destroy({ response,params,bouncer }: HttpContext){
        try {
            const id = params.id
            const deleteEvent = await Event.query().where('id',id).firstOrFail()

            await bouncer.with(AdminBasePolicy).authorize('admin_only')
            await deleteEvent.delete()
        } catch (error) {
          return response.status(500).json({ error: error.message })
        }
      }
}