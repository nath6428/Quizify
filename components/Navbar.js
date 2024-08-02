"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Navbar = () => {
    
    const [signOutToggle, setSignOutToggle] = useState(false)
    const { data: session, status } = useSession();
    
  return (
    <div className='font-sans flex flex-row items-center h-10 m-16'>
            <Link href="/" className='text-5xl mr-auto'>Spotify Web Thing</Link>
            <div className='flex flex-row justify-between mr-20 w-1/2'>
                <Link href="/song">
                    Song Page
                </Link>
                <Link href="/my_music_data">
                    My Music Data
                </Link>
                <Link href="/new-quiz">
                    Create New Quiz
                </Link>
                <Link href="/new-playlist">
                    Take A Friend's Quiz
                </Link>
            </div>
            {status === 'authenticated' ?
                <div className = 'basis-72' onClick={() => {setSignOutToggle((prev) => {return !prev})}}>
                    <div className='flex hover:cursor-pointer justify-around items-center rounded-xl border p-4'>
                        <p>{session.user.name}</p>
                        <Image 
                            src={session.user.image}
                            alt="User Image"
                            style={{
                                width: '50px',
                                height: 'auto',
                            }}
                            width={50} 
                            height={50}
                            className='rounded-full'
                        />
                    </div>
                    {signOutToggle && 
                        <button onClick={() => signOut()} className='absolute'>
                            <div className='w-72 border-solid border-2 p-4 flex flex-row justify-center items-center'>
                                <p className='text-xl'>
                                    Sign Out
                                </p>
                            </div>
                        </button>
                    }
                </div> 
            : status === 'unauthenticated' ?
                <div>
                    <button onClick={() => {signIn('spotify')}}>
                        <div className=' border-green-400 rounded-xl border-solid border-2 p-4 flex flex-row justify-between items-center'>
                            <Image 
                                src='/spotify-logo.png'
                                alt="Log in"
                                width={50}
                                height={50}
                                className='mr-4'
                            />
                            <p className='text-xl'>
                                Sign in with Spotify
                            </p>
                        </div>
                    </button>
                </div>
            : status === 'loading' ?
                <div className='basis-72'>
                    <p>Loading...</p>
                </div>
            : <div className='basis-72'></div>
            }
    </div>
)
}

export default Navbar


