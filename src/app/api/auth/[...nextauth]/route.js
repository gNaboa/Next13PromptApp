import { connectToDb } from '@/utils/database'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '../../../../models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],callbacks:{
        async session({ session }) {
      try{
        console.log("entrou session");
            await connectToDb()
            const sessionUser = await User.findOne({
                email:session.user.email
            })
            if(!sessionUser){
                await User.create({
                    email:session.user.email,
                    username:session.user.name.replace(" ",""),
                    image:session.user.image
                })
              }
       
            session.user.id =  sessionUser
            return session
        }  catch(e){
            console.log("Errou na session: ",e)
        }
    }
    },
    async signIn({ profile }) {
         try {
            console.log("entrou sinin");
            await connectToDb()
            //check if a user already exists
            const userExists = await User.findOne({
                email:profile.email
            })

            
              //if not create new user
              if(!userExists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ",""),
                    image:profile.picture
                })
              }
            return true;
        } catch (error) {
            console.log("errou feio",error);
            return false;
        }

  
    }
})


 export {handler as GET,handler as POST}
// export default NextAuth(handler)