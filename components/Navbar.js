"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { getSession } from '@/utils/getSession'

const Navbar = () => {
    
    const [signOutToggle, setSignOutToggle] = useState(false)
    const [session, setSession] = useState(null);
    const [status, setStatus] = useState('unauthenticated');
    const [linksVisible, setLinksVisible] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
          try {
            setStatus('loading');
            const newSession = await getSession();
            setSession(newSession);
            if (newSession) {
              setStatus('authenticated');
            } else {
              setStatus('unauthenticated');
            }
          } catch (error) {
            console.error("Error fetching session:", error);
            setStatus('error');
          }
        };
    
        fetchSession();
      }, []);

    const renderUserBox = () => {
        return <div className='basis-40 md:basis-72'>
                {status == 'authenticated' ?
                    <div className = 'basis-72' onClick={() => {setSignOutToggle((prev) => {return !prev})}}>
                        <div className='flex hover:cursor-pointer justify-around items-center rounded-xl border p-4'>
                            <p>{session.user.name}</p>
                            <Image 
                                src={session.user.picture}
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
                                <div className='w-40 h-4 md:h-auto md:w-72 border-solid border-2 p-4 flex flex-row justify-center items-center'>
                                    <p className='text-xl'>
                                        Sign Out
                                    </p>
                                </div>
                            </button>
                        }
                    </div> 
                : status == 'unauthenticated' ?
                    <div className='basis-72'>
                        <button onClick={() => {signIn('spotify', { callbackUrl: '/' })}}>
                            <div className=' border-green-400 rounded-xl border-solid border-2 p-4 flex flex-row justify-between items-center'>
                                <Image 
                                    src='/spotify-logo.png'
                                    alt="Log in"
                                    width={50}
                                    height={50}
                                    className='mr-4'
                                />
                                <p className='text-xs md:text-xl'>
                                    Sign in with Spotify
                                </p>
                            </div>
                        </button>
                    </div>
                : status == 'loading' ?
                    <div className='basis-72'>
                        <p>Loading...</p>
                    </div>
                : <div className='basis-72'></div>
                }
            </div>
    }


  return (
    <div className='font-sans flex flex-col items-center justify-center md:flex-row md:justify-between md:my-16 md:mx-2 xl:mx-16'>
            <div className='flex flex-row w-full px-5 justify-between items-center mt-4 mb-8 md:hidden'>
                <Link href="/" className='text-5xl'>Quizify</Link>
                {renderUserBox()}
            </div>
            <Link href="/" className='hidden md:my-0 md:text-6xl md:flex'>Quizify</Link>
            <button onClick={() => setLinksVisible((prev) => {return !prev})} className='md:hidden'>≡</button>
            <div className={`${linksVisible ? 'flex' : 'hidden'} flex-col justify-between md:flex md:flex-row md:w-1/2 md:text-lg`}>
                <Link href="/song" className='mb-2 md:mb-0'>
                    Currently Listening
                </Link>
                <Link href="/my_music_data" className='mb-2 md:mb-0'>
                    My Music Data
                </Link>
                <Link href="/new-quiz" className='mb-2 md:mb-0'>
                    Create New Quiz
                </Link>
                <Link href="/play-quiz" className='md:mb-0'>
                    Take A Friend&apos;s Quiz
                </Link>
            </div>
            <div className='hidden md:flex md:basis-72'>
                {renderUserBox()}
            </div>
            
    </div>
)
}

export default Navbar


