import React from 'react'
import PromptCard from './PromptCard'

type post={
  post: {
    creator: {
      image: string,
      username: string,
      email: string
    },
    prompt: string,
    tag: string
  }
}

type ProfileProps={
  name:string,
  description:string,
  data:post[],
  handleEdit:()=>void,
  handleDelete:()=>void
}

function Profile({name,description,data,handleEdit,handleDelete}:ProfileProps) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left blue_gradient'>{name} Profile</h1>
      <p className='desc text-left'>{description}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post)=>(
          <PromptCard
            post={post}

          />
        ))}
      </div>
    </section>
  )
}

export default Profile