import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, userName }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='post-card w-full h-min mb-5 overflow-hidden bg-red transition-all duration-500 sm:hover:scale-105 sm:rounded-xl'>
                <div className='w-full justify-center items-center'>
                    <img
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-56 sm:h-52 object-cover sm:rounded-xl'
                    />
                </div>
                <div className="p-2 px-4">
                    <h2 className='text-zinc-100 font-ibm font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>
                        {title}
                    </h2>
                    <h2 className='text-stone-400 font-ibm overflow-hidden whitespace-nowrap text-ellipsis'>
                        {userName}
                    </h2>
                </div>
            </div>

        </Link>
    )
}


export default PostCard