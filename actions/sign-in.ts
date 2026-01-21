'use server';

import * as auth from '@/auth';

export async function signInGithub(){
    console.log("Signing in on signInGithub sign-in.ts");
    return auth.signIn('github');
}

export async function signInGoogle(){
    console.log("Signing in on signInGoogle sign-in.ts");
    return auth.signIn('google', { callbackUrl: '/profile'});
}


export async function signUp(){
    return auth.signIn('github');
}
