
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'


const schema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().trim().min(8).max(20),
    age: z.number().positive().min(0),
});

type FormValuesTypes = z.infer<typeof schema>

export default function HookForm() {

    const form = useForm<FormValuesTypes>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            age: 0,
        },
        resolver: zodResolver(schema),
        mode: "all"
    });

    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting, isValid } } = form;


    const handleFormSubmit = async (data: FormValuesTypes) => {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                resolve();
                console.log(isDirty, isSubmitting, data)
                reset()
            }, 1000);
        });
    }


    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
              <p className="block mt-1 text-xs text-red-500 ">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
               <p className="block mt-1 text-xs text-red-500 ">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
               <p className="block mt-1 text-xs text-red-500 ">{errors.password?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block mb-1 font-semibold">Age</label>
              <input
                type="age"
                id="age"
                {...register("age",{ valueAsNumber: true })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your age"
              />
               <p className="block mt-1 text-xs text-red-500 ">{errors.age?.message}</p>
            </div>
            <button
            disabled={ !isDirty || !isValid || isSubmitting }
              type="submit"
              className="w-full disabled:opacity-50 disabled:cursor-no-drop bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      );
    
}
