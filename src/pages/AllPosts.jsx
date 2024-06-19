import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseServices from '../appwrite/database'

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        databaseServices.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='custom-h my-8 flex justify-center items-center'>
                <p className='text-xl'>No posts yet!</p>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='custom-h flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts