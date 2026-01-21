'use client';
import { useEffect, useState } from 'react';
import { Input, Textarea } from '@heroui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Button } from '@heroui/button';
import * as actions from '@/actions';
import { useActionState, startTransition } from "react";
import FormButton from '../common/form-button';


interface TopicEditFormProps{
    slug:string
}

export default function TopicEditForm({slug}:TopicEditFormProps){
    const [topic, setTopic] = useState<{ slug: string; description: string | null } | null>(null);
    useEffect(() => {
        actions.getTopic(slug).then(setTopic);
    }, [slug]);
    const name = topic?.slug;
    const description = topic?.description;
    const title = "Edit a Topic"
    const [formState, action, isPending] = useActionState(actions.editTopic.bind(null,slug), {
        errors:{}
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event?.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(()=>{
            action(formData);
        });
    }

    return (
        <Popover placement='bottom-end'>
            <PopoverTrigger>
                <Button color="primary">
                    {title}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3>{title}</h3>
                        < Input
                            name='name'
                            defaultValue={name}
                            label={name}
                            labelPlacement='outside'
                            placeholder={name}
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(', ')}
                        />
                        <Textarea
                            name='description'
                            defaultValue={description!}
                            label={description}
                            labelPlacement='outside'
                            placeholder={description!}
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
                        />
                        {formState.errors._form ? (
                            <div className='rounded p-2 bg-red-200 border border-red-400'>
                                {formState.errors._form?.join(', ')}
                            </div>
                        ) : null}
                        <FormButton isLoading={isPending}>Submit</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}