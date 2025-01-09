import vine from '@vinejs/vine'

const schema =  vine.object({
    username: vine.string().minLength(6).maxLength(254).unique( async(db, value, field)=>{
        const user = await db.from('users')
                             .where('username',value)
                             .first()
        return !user
    }),
    password: vine.string().minLength(6).confirmed(),
    name: vine.string().minLength(6)
})

export const registerUserValidator = vine.compile(schema)