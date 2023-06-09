import Image from "next/image"
import { useState } from "react"


type CardProps = {
  post: {
    creator: {
      image: string,
      username: string,
      email: string
    },
    prompt: string,
    tag: string
  },
  handleEdit?:()=>void,
  handleDelete?:()=>void
}

function PromptCard({ post }: CardProps) {
  const [copied, setCopied] = useState("")
  
  const handleCopy = () =>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(""),3000)
  }
  return (
    <div className="prompt_card ">
      <div className="flex flex-col justify-between items-start gap-2">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="userimage"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col text-start ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm
              text-gray-500">
              {post.creator.email}
            </p>
          </div>
          <div className="copy_btn">
            <Image
              src={copied === post.prompt ?
                '/assets/icons/tick.svg' :
                '/assets/icons/copy.svg'
              }
              alt=""
              width={12}
              height={12}
              onClick={handleCopy}
            />
          </div>
        </div>
        <div className="flex flex-col">
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p className="font-inter text-sm blue_gradient cursor-pointer">#{post.tag}</p>
        </div>
        
      </div>



    </div>
  )
}

export default PromptCard