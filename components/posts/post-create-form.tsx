'use client';

import { Input, Textarea } from '@heroui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Button } from '@heroui/button';
import * as actions from '@/actions';
import { useActionState, startTransition } from "react";
import FormButton from '../common/form-button';

interface PostCreateFormProps{
    slug:string
}


export default function PostCreateForm({slug}:PostCreateFormProps){
    const title = "Title"
    const content = "Describe your post"
    const [formState, action, isPending] = useActionState(
        actions.createPost.bind(null,slug),
        {
        errors:{}
        }
    );

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
                    Create a Post
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3>Create a Post</h3>
                        < Input
                            name='title'
                            label={title}
                            labelPlacement='outside'
                            placeholder={title}
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            name='content'
                            label={content}
                            labelPlacement='outside'
                            placeholder={content}
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
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
    );
}