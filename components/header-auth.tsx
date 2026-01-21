'use client';
import { signInGithub, signInGoogle, signOut, signUp } from '@/actions';
import { Avatar } from '@heroui/avatar';
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@heroui/navbar";
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

import CustomButton from './customButton';
import { useSession } from "next-auth/react";

export default function HeaderAuth(){
    const session = useSession();
    let authContent: React.ReactNode;
    if (session.status==="loading"){
        authContent=null;
    } else if (session.data?.user){
        authContent =(
            <>
                <Popover placement='left'>
                    <PopoverTrigger>
                        <Avatar src={session.data.user.image!} classNames={{ img: "opacity-100" }} imgProps={{ referrerPolicy: "no-referrer" }} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <CustomButton title="Sign Out" action={signOut} />
                    </PopoverContent>
                </Popover>
            </>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <CustomButton title="Sign In with GitHub" action={signInGithub} color='secondary' variant='bordered'/>
                </NavbarItem>
                <NavbarItem>
                    <CustomButton title="Sign In with Google" action={signInGoogle} color='secondary' variant='bordered'/>
                </NavbarItem>
                <NavbarItem>
                    <CustomButton title="Sign up" action={signUp}  color='primary' variant='flat'/>
                </NavbarItem>
            </>
        )
    }
    return authContent;
}