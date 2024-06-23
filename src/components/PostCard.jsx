import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, userName }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='post-card w-full h-min mb-5 overflow-hidden bg-red transition-all duration-300 sm:hover:scale-105 sm:rounded-2xl'>
                <div className='w-full justify-center items-center'>
                    <img
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-56 sm:h-52 object-cover sm:rounded-t-xl'
                    />
                </div>
                <div className="p-2 px-3">
                    <h2 className='text-zinc-100 font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>
                        {title}
                    </h2>
                    <h2 className='text-xs text-zinc-100 font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>
                        {userName}
                    </h2>
                </div>
            </div>

        </Link>
    )
}


export default PostCard