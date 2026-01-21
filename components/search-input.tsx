'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@heroui/input';
import * as actions from '@/actions';

export default function SearchInput(){
    const searchParams = useSearchParams();

    return (
        <form action={actions.search}>
            <Input name="term" defaultValue={searchParams.get('term') || ""} variant="bordered" />
        </form>
    );
}