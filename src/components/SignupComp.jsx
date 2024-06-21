import React, { useState } from 'react'
import { Button, Input, Logo } from "./index"
import { Link, useNavigate } from 'react-router-dom';
import { login as loginSlice } from '../context/authSlice';
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const SignupComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors } = formState;

  const registerUser = async (data) => {
    setAuthError("");
    setLoading(true);

    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(loginSlice(userData));
        navigate("/");
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center custom-h">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

        {/* UPPER PART */}

        <div className="mb-2 flex justify-center">
          <Logo className='w-44' />
        </div>
        <h2 className="my-4 text-center text-2xl font-semibold font-mono leading-tight text-black/60">Sign up to create account</h2>
        <p className="my-4 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600"
          >
            Sign In
          </Link>
        </p>
        {authError && <p className="text-red-600 mt-8 text-center">{authError}</p>}

        {/* FORM START */}

        <form onSubmit={handleSubmit(registerUser)} noValidate>
          <div className='space-y-5'>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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

            {/* LOADER */}
            <div className='p-2 text-center'>
              {loading && <div className="loader text-lg font-semibold text-black">Loading...</div>}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupComp