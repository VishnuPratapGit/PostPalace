import React, { useCallback, useEffect } from 'react'
import { Button, Input, RTE, Select } from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import databaseServices from '../../appwrite/database'

const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const submitForm = async (data) => {
        if (post) {
            // If updating a post
            const file = data.image[0] ? await databaseServices.uploadFile(data.image[0]) : null;
            if (file) {
                databaseServices.deleteFile(post.featuredImage);
            }

            const updatedPostData = {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            };

            const updatedPost = await databaseServices.updatePost(post.$id, updatedPostData);
            if (updatedPost) {
                navigate(`/post/${updatedPost.$id}`);
            }
        } else {
            // If creating a new post
            const file = data.image[0] ? await databaseServices.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                const newPostData = {
                    ...data,
                    featuredImage: fileId,
                    userId: userData.$id,
                    userName: userData.name
                };

                const newPost = await databaseServices.createPost(newPostData);
                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            } else {
                console.log("Featured image not provided");
            }
        }
    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-wrap gap-20 text-white">
            <div className="w-full xl:w-3/5 px-2">
                <Input
                    label="Title :"
                    color="white"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    color="white"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div>
                    <label className='inline-block mb-1 pl-1'>Content :</label>
                    <div className='min-h-96 h-min bg-white rounded-md'>
                        <RTE name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>
            </div>

            <div className="w-full xl:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    color="white"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseServices.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    color="white"
                    label="Status :"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm