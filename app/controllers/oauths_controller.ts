import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default class AuthController {
    public async redirectToMicrosoft({ response }: HttpContext) {
        const session_stage =uuidv4()
        //console.log(session_stage);
        
        const queryParams = new URLSearchParams({
            client_id: process.env.MICROSOFT_CLIENT_ID!,
            response_type: 'code',
            redirect_uri: process.env.MICROSOFT_REDIRECT_URI!,
            scope: 'openid profile email User.Read',
            state: session_stage, // Replace with a secure random state
        }).toString()
        // ต่อพารามิเตอร์ query เข้ากับ OAUTH_ENDPOINT
        const redirectUrl = `${process.env.OAUTH_ENDPOINT!}?${queryParams}`;

        // ทำการรีไดเรกต์ไปยัง URL ที่สร้าง
        return response.redirect(redirectUrl);
    }


    public async handleMicrosoftCallback({ request, response, auth }: HttpContext) {
        
        const code = request.input('code')
        

        if (!code) {
            return response.badRequest('Authorization code is required')
        }
        let  tokenResponse =null
        // Exchange code for an access token
        try {
            // ส่งคำขอแลกเปลี่ยน code เป็น access token
              tokenResponse  = await axios.post(
                `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
                new URLSearchParams({
                  client_id: process.env.MICROSOFT_CLIENT_ID!,
                  client_secret:process.env.MICROSOFT_CLIENT_SECRET!,
                  code:code,
                  grant_type: 'authorization_code',
                  redirect_uri:process.env.MICROSOFT_REDIRECT_URI!,
                })
              )
    
        } catch (error) {
        //    console.error('Error exchanging code for token:', error)
            return response.internalServerError('Failed to exchange code for token')
        }

         const accessToken = tokenResponse.data.access_token

       //  console.log(tokenResponse);
         

       // Retrieve user information from Microsoft Graph API
        const userResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        
        const { mail, displayName,id} = userResponse.data


        const user = await User.firstOrCreate(
            { oid: id },
            { oid: id ,name: displayName ,username:mail,password:this.generateRandomPassword(10)}
        )

    
        return await auth.use('jwt').generate(user)


    }
    
    // private decodeIdToken(idToken: string) {
    //     const base64Payload = idToken.split('.')[1]
    //     const decodedPayload = Buffer.from(base64Payload, 'base64').toString('utf8')
    //     return JSON.parse(decodedPayload)
    // }

    private  generateRandomPassword(length:number) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"; // ตัวอักษร, ตัวเลข, สัญลักษณ์พิเศษ
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length); // สุ่มตำแหน่ง
            password += charset[randomIndex]; // เพิ่มตัวอักษรที่สุ่มได้
        }
        
        return password;
    }
}

