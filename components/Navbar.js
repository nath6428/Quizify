import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='font-sans flex flex-row items-center h-10 m-16'>
            <Link href="/" className='text-5xl mr-auto'>Spotify Web Tool</Link>
            <div className='flex flex-row justify-between mr-20 w-1/2'>
                <Link href="/song">
                    Song Page
                </Link>
                <Link href="/new-playlist">
                    New Playlist
                </Link>
                <Link href="/new-playlist">
                    Take A Friend's Quiz
                </Link>
                <Link href="/new-playlist">
                    Create New Quiz
                </Link>
            </div>
            <button>
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
)
}

export default Navbar