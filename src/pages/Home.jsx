import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseServices from '../appwrite/database';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const userLogin = useSelector((state) => state.auth.status);

    useEffect(() => {
        databaseServices.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="custom-h flex flex-wrap">
                        <div className="p-2 w-full flex justify-center items-center">
                            <h1 className="text-2xl font-medium text-gray-400">
                                {userLogin ? "No posts available!" : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
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

export default Home