import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-80 overflow-hidden bg-red sm:hover:scale-105 transition-all duration-300 sm:rounded-2xl md:rounded-2xl lg:rounded-2xl'>
                <div className='w-full justify-center items-center mb-2'>
                    <img
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-52 object-cover sm:rounded-xl md:rounded-xl lg:rounded-xl'
                    />
                </div>
                <h2 className='text-lg text-zinc-300 font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>
                    {title}
                </h2>
            </div>

        </Link>
    )
}


export default PostCard