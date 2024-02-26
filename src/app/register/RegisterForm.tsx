'use client'
import { useState } from "react";
import Heading from "../components/Heading/heading";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";


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
    return ( 
        <>
        <Heading titlle="Sign Up For E-shop" />
        <hr  className="bg-slate-300 w-full h-px"/>
        <Input id="name" label="Name" register={register} errors={errors} required />
        </>
     );
}
 
export default RegisterForm
;