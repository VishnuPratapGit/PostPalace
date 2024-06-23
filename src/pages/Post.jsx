import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../appwrite/database";
import { Button, Container, PreLoader } from "../components";
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
        <div className="py-8 px-5 sm:px-20">
            <Container>
                <div className="flex justify-center">
                    <div className="w-full shadow-inner sm:w-4/5 flex justify-center mb-4 relative rounded-2xl">
                        <img
                            src={databaseServices.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="post-img rounded-2xl"
                        />

                        {isAuthor && (
                            <div className="absolute top-2 right-2 sm:right-6 sm:top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-600" className="text-xs sm:text-base mr-2 px-1.5 py-0.5 rounded-md">
                                        <i class="fa-solid fa-file-pen"></i>
                                    </Button>
                                </Link>

                                <Button bgColor="bg-red-600" className="text-xs sm:text-base px-1.5 py-0.5 rounded-md" onClick={deletePost}>
                                    <i class="fa-solid fa-trash-can"></i>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="text-stone-300 overflow-hidden">
                    <div className="w-full mb-6">
                        <h1 className="text-4xl font-bold mt-5 py-5">{post.title}</h1>
                        <p className="text-xl pb-8 border-b border-b-zinc-700">{createdAt}</p>
                    </div>
                    <div className="rte-content font-medium break-words prose lg:prose-lg dark:prose-invert prose-strong:text-inherit max-w-none text-justify">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (<div className="custom-h my-8 flex justify-center items-center">
        <PreLoader type="bars" color="gray" height={60} width={60} />
    </div>
    );
}