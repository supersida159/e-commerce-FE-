'use client'

import { IconType } from "react-icons"

interface ButtonProps {
    label: string
    disabled?: boolean
    outline?: boolean
    small?: boolean
    custom?: string
    icon?: IconType
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = () => {
    return (  );
}
 
export default Button;