import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import OAuth from '../components/OAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { signInSchema } from '../validations/AuthValidation';

type SigninValueTypes = z.infer<typeof signInSchema>

export default function Signin() {

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid, isSubmitting } } = useForm<SigninValueTypes>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(signInSchema),
    mode: "all"
  });

  const isDisabled = !isDirty || !isValid || isSubmitting;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const error = useAppSelector(state => state.user.error);

  const handleSignin = async (signinData: SigninValueTypes) => {

    try {
      dispatch(signInStart());
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(signinData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { message, data } = await response.json();

      if(!response.ok) {
        dispatch(signInFailure(message));
        return navigate('/signin');
      }

      dispatch(signInSuccess(data));
      reset();
      return navigate('/', { replace: true });

    } catch (error) {
      dispatch(signInFailure((error as any)?.message));
    } finally {
      setTimeout(() => {dispatch(signInFailure(""))}, 9000);
    }
  }

  return (
    <div className='flex flex-col items-centermin-h-screen w-full lg:max-w-lg mx-auto p-3 '>
      <div className='w-full mt-40 h-full'>
        <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleSignin)}>
          <input type="email" autoComplete='on' id="email" {...register("email")} placeholder='Email' className='bg-slate-100 p-3 rounded-lg' />
          {errors.email?.message &&  <p className='text-sm text-red-600  '> {errors.email?.message} </p>}

          <input type="password" autoComplete='on' {...register("password")} id="password"  placeholder='Password' className='bg-slate-100 p-3 rounded-lg' />
          {errors.password?.message &&  <p className='text-sm text-red-600  '> {errors.password?.message} </p>}
         
          <button disabled={isDisabled} className="disabled:cursor-no-drop bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {isSubmitting ? "Loading..." : "Signin"}
          </button>
          <OAuth />
        </form>
        <div className="flex items-center justify-center gap-2 mt-5 ">
          <p>Dont't have an account?</p>
          <Link to="/signup" >
            <span className="text-blue-500">Signup</span>        
          </Link>
        </div>
        {error &&  <p className='text-sm text-red-600 mt-5 text-center bg-red-200 p-1 rounded'> {error} </p>}
      </div>
    </div>
  )
}
