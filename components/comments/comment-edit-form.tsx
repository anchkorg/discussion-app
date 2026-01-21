"use client";

import { useActionState,startTransition, useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

interface CommentEditFormProps {
    postId: string;
    parentId?: string;
    commentId: string;
    startOpen?: boolean;
}

export default function CommentEditForm({
    postId,
    parentId,
    commentId,
    startOpen,
}: CommentEditFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const boundCreateComment = useCallback(
    (prevState: any, formData: FormData) => {
      return actions.editComment({ postId, parentId, commentId }, prevState, formData);
    },
    [postId, parentId]
  );
  const [formState, action, isPending] = useActionState(
    boundCreateComment,
    { errors: {} }
  );
  
  const [comment, setComment] = useState<{ content: string | null } | null>(null);
  useEffect(() => {
        actions.getComment(commentId).then(setComment);
  }, [commentId]);

  var content = comment?.content;
  useEffect(() => {
    console.log("content is ",{content}," on useEffect");
    if (formState.success) {
        actions.getComment(commentId).then((updatedComment) => {
        setComment(updatedComment);
        // Close the popover after successful update
        setIsOpen(false);
      });
      ref.current?.reset();
    }
  }, [formState, startOpen]);
  
  useEffect(() => {
    if (comment?.content && textareaRef.current) {
      textareaRef.current.value = comment.content;
    }
  }, [comment]);
  
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
      console.log("textareaRef.current.value is ",{textareaRef});
      console.log("content is ",{content});
    });
  }


  const form = (
    <form onSubmit={handleSubmit} ref={ref}>
      <div className="space-y-2 w-[75vw] md:w-[50vw] lg:w-[40vw] p-2">
        <Textarea
          name="content"
          defaultValue={comment?.content || ""}
          ref={textareaRef}
          label="Edit"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending}>Edit Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Popover placement='bottom-end' isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger><Button size="sm" color="secondary" variant="light" >
          Edit
        </Button></PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className="space-y-2 w-[75vw] md:w-[50vw] lg:w-[40vw] p-0">
            <Textarea
              name="content"
              defaultValue={comment?.content || ""}
              ref={textareaRef}
              label="Edit"
              placeholder="Enter your comment"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Edit Comment</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
    </div>
  );
}
