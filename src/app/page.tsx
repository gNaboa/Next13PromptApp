import Image from 'next/image'
import Feed from '../components/Feed'
export default function Home() {
  return (
   <section className='w-full flex flex-col text-center justify-center items-center'>
     <h1 className='head_text text-center'>
      Discover & share

      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>
         AI-Powered Prompts
      </span>
     </h1>
     <p className='desc text-center'>
        Promptopia is an open-source AI prompting tool for 
        modern world to discover, create and share creative prompts.
     </p>
     <div>
      <Feed/>
     </div>
   </section>
  )
}
