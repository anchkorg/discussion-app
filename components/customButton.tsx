'use client';

import { Button, ButtonProps } from '@heroui/button';
import { signOut as clientSignOut } from 'next-auth/react';

interface CustomButtonProps extends ButtonProps {
    title: string;
    action: (formData: FormData) => Promise<void>; // 更新此處以匹配 FormData 類型
}

export default function CustomButton({ title, action, ...rest }: CustomButtonProps) {
    
    // 在參數中加入 formData 以符合 React 19 的 formAction 類型要求
    const handleSignOut = async (formData: FormData) => {
        await clientSignOut({
            callbackUrl: '/',
            redirect: true
        });
    };

    return (
        <form action={title==="Sign Out"?handleSignOut:action}>
            <Button 
                type="submit" 
                {...rest}
            >
                {title}
            </Button>
        </form>
    );
}
