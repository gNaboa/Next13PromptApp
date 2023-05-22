'use client'
import axios from 'axios'
import React, { useState } from 'react'
import Form from '../../components/Form'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function page() {
    const router = useRouter()
    const { data: session,status } = useSession()
    const [submitting,setSubmitting] = useState(false)
    const [post,setPost] = useState({
        prompt:'',
        tag:'',
    })

    const createPrompt = async () =>{
            setSubmitting(true)
            try{
                const response = await axios.post('/api/prompt/new',{
                    userId:session?.user!.id,
                    prompt:post.prompt,
                    tag:post.tag
                })

                if(response.status==200){
                     router.push('/')
                }
            }catch(error){
              console.log('erro no front do prompt: ',error)
            }finally{
                setSubmitting(false)
            }
       
    }
  return (
    <div>
        <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
        
    </div>
  )
}

export default page