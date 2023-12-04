import { Link, useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { signUpSchema } from '../validations/AuthValidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { signUpFailure, signUpStart, signUpSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const baseUrl = "/api/v1"


type SignupValueTypes = z.infer<typeof signUpSchema>

export default function Signup() {

  const {register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting }} = useForm<SignupValueTypes>({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(signUpSchema),
    mode: "all"
  });

  const isDisabled = !isDirty || !isValid || isSubmitting;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  

  const handleSignup = async (signupdata: SignupValueTypes) => {

    try {
      dispatch(signUpStart());
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupdata),
        headers: {
          'Content-Type': "application/json"
        }
      });

      const { message, data } = await response.json();
   
      if(!response.ok) {
        dispatch(signUpFailure(message));
      }
      dispatch(signUpSuccess(data))
      navigate("/");

    } catch (error) {
      dispatch(signUpFailure((error as any)?.message));
    } finally {
      setTimeout(() => {dispatch(signUpFailure(""))}, 9000);
    }

  }


  return (
    <div className='min-h-screen w-full lg:max-w-lg mx-auto p-3 '>
      <div className="w-full mt-40">
        <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleSignup)}>
          
          <input type="text" autoComplete='on' {...register("username")}  id="username"  placeholder='Username' className='bg-slate-100 p-3 rounded-lg' />
          {errors.username?.message &&  <p className='text-sm text-red-600  '> {errors.username?.message} </p>}
          
          <input type="email" autoComplete='on' {...register("email")}  id="email" placeholder='Email' className='bg-slate-100 p-3 rounded-lg' />
          {errors.email?.message &&  <p className='text-sm text-red-600  '> {errors.email?.message} </p>}
          
          <input type="password" autoComplete='on' {...register("password")} id="password"  placeholder='Password' className='bg-slate-100 p-3 rounded-lg' />
          {errors.password?.message &&  <p className='text-sm text-red-600  '> {errors.password?.message} </p>}
          
          <button disabled={isDisabled} className="disabled:cursor-no-drop bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {isSubmitting ? "Loading..." : "Signup"}
          </button>
          <OAuth />
        </form>
        
        <div className="flex items-center justify-center gap-2 mt-5 ">
          <p>Have an acount?</p>
          <Link to="/signin" >
            <span className="text-blue-500">Signin</span>        
          </Link>
        </div>

        {error &&  <p className='text-sm text-red-600 mt-5 text-center bg-red-200 p-2 rounded'> {error} </p>}
      </div>
    </div>
  )
}
