"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { signOut, getProviders, signIn, useSession } from 'next-auth/react'
function Nav() {

    const [providers, setProviders] = useState<any>(null)
    const [toggleDropDown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()

            setProviders(response)
            console.log('AQUI', response)
        }
        setUpProviders()
    }, [])

    const { data: session,status } = useSession()
    console.log("PROVA", providers)
    console.log("user",session)
    console.log("status",status)
    return (

        <nav className='flex justify-between w-full mb-16 pt-3'>
            <Link href={'/'} className='flex gap-2  items-center'>
                <Image
                    alt='Prompt logo'
                    width={30}
                    height={30} src={'/assets/images/logo.svg'}
                    className='object-contain'
                />
                <p className='logo_text '>Promptopia </p>
            </Link>
            <div className='sm:flex hidden '>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={'/create-prompt'}
                            className='black_btn'
                        >
                            Create Post
                        </Link>
                        <button type='button' onClick={() => signOut()} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={session?.user?.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) :
                    <>

                        {providers &&
                            <button className='black_btn' onClick={() => signIn(providers.google.id)}>
                                Sign In
                            </button>
                        }
                    </>
                }
            </div>

            <div className=' flex relative sm:hidden '>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user?.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt="profile"
                            onClick={() => setToggleDropdown(!toggleDropDown)}
                        />
                        {toggleDropDown && (
                            <div className='dropdown'>
                                <Link href={'/profile'} className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href={'/profile'} className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button className='mt-5 w-full black_btn' onClick={() => { setToggleDropdown(false); signOut() }}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) :
                    <>
                        <div>mobile</div>
                        {providers &&
                            <button className='black_btn' onClick={() => signIn(providers.google.id)}>
                                Sign In
                            </button>
                        }
                    </>}
            </div>
        </nav>

    )
}

export default Nav