// profile.tsx
'use client';

import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface ProfileProps {
  // Use Session | null instead of any
  externalSession?: Session | null;
}

export default function Profile({ externalSession }: ProfileProps) {
    const { data: localSession , status } = useSession();
    const session = externalSession !== undefined ? externalSession : localSession;

    console.log("Current Status:", status);

    if (status === "loading") return <div>Loading...</div>;

    if (session?.user) {
        return <div>From client: {session.user.name} is signed in</div>;
    }

    return <div>From client: user is signed out.</div>;
}
