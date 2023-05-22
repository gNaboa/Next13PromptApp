import {connectToDb } from '../../../../utils/database'
import Prompt from '../../../../models/prompt'
export const POST = async (req) =>{
    const {userId,prompt, tag} = await req.json()
    try{
        await connectToDb()
     
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        })
         console.log("nuevo", newPrompt)
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{
            status:201
        })

    }catch(error){
console.log("Erro no back do prompt: ",error)
    }
}