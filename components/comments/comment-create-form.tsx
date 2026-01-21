"use client";

import { useActionState, startTransition, useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const [formKey, setFormKey] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Use useCallback to keep the action function stable.
  // This prevents the "second click fails" issue caused by function reference changes.
  const boundCreateComment = useCallback(
    (prevState: any, formData: FormData) => {
      return actions.createComment({ postId, parentId }, prevState, formData);
    },
    [postId, parentId]
  );

  const [formState, action, isPending] = useActionState(
    boundCreateComment,
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
      // Incrementing the key forces React to unmount/remount the form, clearing the input.
      setFormKey((prev) => prev + 1);
      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  // 2. Manual submit handler
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
      console.log("textareaRef.current.value is ",{textareaRef});
    });
  }

  const form = (
    <form onSubmit={handleSubmit} key={formKey} noValidate>
      <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          ref={textareaRef}
          // Explicitly setting defaultValue ensures the input is empty on remount
          defaultValue=""
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <FormButton isLoading={isPending}>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}