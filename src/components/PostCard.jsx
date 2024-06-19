import React from 'react'
import databaseService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-zinc-700 border border-white rounded-2xl p-4 hover:scale-105 transition-all duration-500'>
                <div className='w-full justify-center mb-4'>
                    <img src={databaseService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2
                    className='text-xl text-zinc-300 font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard