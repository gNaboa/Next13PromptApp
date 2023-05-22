'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick} : any)=>{
  return (
    <div className='mt-16 prompt_layout'>
          {data.map(post=>(
             <PromptCard
              key={post._id}
              post={post}
             />
          ))}
    </div>
  )
}

function Feed() {

const [searchText,setSearchText] = useState('')
const [posts,setPosts] = useState([])
const handleSearchChange = () =>{

}
 useEffect(()=>{
  const fetchPosts= async()=>{
    const response = await axios.get('/api/prompt')
    const data = await response.data
    setPosts(data)
  }
  fetchPosts()
 },[])
 console.log('POSTS,',posts)
  return (
   <section className='feed'>
    <form action="" className=' relative w-full flex-center'>
        <input  
        type="text"
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}
        placeholder="Search for a tag or a username"
        required
        className='search_input peer'
        />
    </form>
     <PromptCardList  data={posts}/>
   </section>
  )
}

export default Feed