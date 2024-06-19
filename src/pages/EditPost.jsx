import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import databaseServices from '../appwrite/database';
import { Container, PostForm } from '../components';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (slug) {
                try {
                    const post = await databaseServices.getPost(slug);
                    if (post) setPost(post);
                } catch (error) {
                    console.error("Error fetching post in EditPost: ", error);
                }
            } else {
                navigate("/")
            }
        }
        fetchData();
    }, [slug, navigate]);


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost