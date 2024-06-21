import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const [createdAt, setCreatedAt] = useState("")


    useEffect(() => {
        if (slug) {
            databaseServices.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);

                    //extract date
                    const formattedDate = new Date(post.$createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    setCreatedAt(formattedDate)
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);


    const deletePost = () => {
        databaseServices.deletePost(post.$id).then((status) => {
            if (status) {
                databaseServices.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 px-20">
            <Container>
                <div className="flex justify-center">
                    <div className="w-4/5 flex justify-center mb-4 relative border border-zinc-700 rounded-2xl">
                        <img
                            src={databaseServices.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="post-img rounded-2xl"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-1 px-1.5 py-0.5 rounded-md">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="px-1.5 py-0.5 rounded-md" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="text-stone-300">
                    <div className="w-full mb-6">
                        <h1 className="text-4xl font-bold mt-5 py-5">{post.title}</h1>
                        <p className="text-xl pb-8 border-b border-b-zinc-700">{createdAt}</p>
                    </div>
                    <div className="browser-css font-medium text-xl">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}