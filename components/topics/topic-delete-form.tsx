'use client';

import { use } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Button } from '@heroui/button';
import * as actions from '@/actions';
import { useActionState, startTransition } from "react";
import FormButton from '../common/form-button';
import { useRouter } from 'next/navigation';

interface TopicDeleteFormProps{
    slug:string
}


export default function TopicDeleteForm({slug}:TopicDeleteFormProps){
    const [formState, action, isPending] = useActionState(
        actions.deleteTopic.bind(null,slug),
        {
        errors:{}
        }   
    );
    const router = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event?.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(()=>{
            action(formData);
            router.refresh(); 
        });
    }

    return (
        <Popover placement='bottom-end'>
            <PopoverTrigger>
                <Button color="secondary">
                    Delete a Topic
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        {formState.errors._form ? (
                            <div className='rounded p-2 bg-red-200 border border-red-400'>
                                {formState.errors._form?.join(', ')}
                            </div>
                        ) : null}
                        <FormButton isLoading={isPending}>Confirm the Delete a Topic</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}