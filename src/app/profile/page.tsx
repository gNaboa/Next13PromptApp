'use client'

import Profile from '@/components/Profile'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function ProfilePage() {
    const { data: session, status } = useSession()
    console.log('PROFILEUSER',  session?.user!.id._id)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`/api/users/${session?.user!.id._id}/posts`)
            const data = await response.data
            setPosts(data)
        }
        if (session?.user!.id){
            fetchPosts()
        } 
      
    }, [session?.user!.id])

    console.log('profiledata',posts)
    const handleEdit = () =>{

    }
    const handleDelete = async ()=>{

    }
    return (
        <div>
              <Profile
                name='My'
                description='Welcome to my profile'
                data={posts} 
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />  
        </div>
    )
}

export default ProfilePage