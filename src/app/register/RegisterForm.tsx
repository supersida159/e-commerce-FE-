'use client'
import { useState } from "react";
import Heading from "../components/Heading/heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/products/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";


const RegisterForm
 = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register,handleSubmit,formState:{errors}} =useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }

    return ( 
        <>
        <Heading titlle="Sign Up For E-shop" />
        <Button
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
        />
        <hr  className="bg-slate-300 w-full h-px"/>
        <Input id="email" label="Email" register={register} errors={errors} required type="email"/>
        <Input id="name" label="Name" register={register} errors={errors} required />
        <Input id="password" label="Password" register={register} errors={errors} required type="password" />
        <Button 
        label={isLoading ? "Loading..." : "Sign Up"}
        disabled={isLoading} 
        onClick={handleSubmit(onSubmit)} />
        <p>
            Already have an account?
            <Link className="text-blue-300 underline" href="/login">  Login</Link>
        </p>
        </>
     );
}
 
export default RegisterForm
;