
import { Resend } from "resend"
import { config } from "dotenv"
import { type Destinatarios } from "@/types/destinatarios"

config()

type resendReponse = {
    id?: string,
    error?: string 
}


export const sendEmail = async ({ Nombre, Correo, Asunto, Mensaje }: Destinatarios): Promise<resendReponse> => {

    const resendInstance = new Resend(process.env.RESEND_API_KEY)

    try {

        const {data, error} = await resendInstance.emails.send({
            from: "onboarding@resend.dev",
            to: ['codekei0204@gmail.com'],
            subject: "Correo de prueba saliente desde la aplicacion de Astro",
            html: `<h1>Hola, este es un correo de prueba</h1><p>Nombre:${Nombre} | Correo: ${Correo} | Asunto: ${Asunto} | Mensaje: ${Mensaje}.</p>`
        })

        if(error){
            throw new Error(error.message)
        }

        return data as resendReponse

    }
    catch(error){

        const reponse: resendReponse = {
            error: (error as Error).message
        }

        return reponse
            
    }

}





