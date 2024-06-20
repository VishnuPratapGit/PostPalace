import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseServices from '../appwrite/database'
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.auth.userData?.$id);

    useEffect(() => {
        if (userId) {
            databaseServices.getPosts([Query.equal("userId", userId)])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents)
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("AllPosts:: getPost :: Error: ", err.message);
                    setFetchError(true);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setFetchError(true);
        }
    }, []);


    if (fetchError) {
        return (
            <div className='custom-h my-8 flex justify-center items-center'>
                <p className='text-xl'>Error fetching posts. Please try again later.</p>
            </div>
        )
    }

    return loading ? (
        <div className='custom-h my-8 flex justify-center items-center'>
            <p className='text-xl'>Loading...</p>
        </div>
    ) : (posts.length === 0) ? (
        <div className='custom-h my-8 flex justify-center items-center'>
            <p className='text-xl'>No Posts Yet!</p>
        </div>
    ) : (
        <div className='w-full py-8'>
            <Container>
                <div className='custom-h grid gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts