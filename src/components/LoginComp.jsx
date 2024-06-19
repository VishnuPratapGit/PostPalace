import React, { useState } from 'react'
import { Button, Input, Logo } from "./index"
import { Link, useNavigate } from 'react-router-dom';
import { login as loginSlice } from '../context/authSlice';
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const LoginComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    const [authError, setAuthError] = useState("");
    const { errors } = formState;

    const login = async (data) => {
        setAuthError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(loginSlice(userData));
                navigate("/");
            }
        } catch (error) {
            setAuthError(error.message);
        }
    }


    return (
        <div className='flex items-center justify-center custom-h w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* UPPER PART */}

                <div className="mb-2 flex justify-center">
                    <Logo className='w-44' />
                </div>
                <h2 className="text-center text-2xl font-mono font-semibold leading-tight text-black/60">Sign in to your Account</h2>
                <p className="mt-2 text-center text-base text-black/60">Don&apos;t have account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600">Sign Up</Link>
                </p>
                {authError && <p className="text-red-600 mt-8 text-center">{authError}</p>}

                {/* FORM START */}

                <form onSubmit={handleSubmit(login)} className='mt-8' noValidate>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <p className='text-red-600'>{errors.email?.message}</p>
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComp