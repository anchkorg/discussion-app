"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface PostDeleteFormProps {
  postId: string;
  startOpen?: boolean;
}

export default function PostDeleteForm({
  postId,
  startOpen,
}: PostDeleteFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.deletePost.bind(null, { postId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending}>Confirmed delete Post</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button color="danger" variant="light" onClick={() => setOpen(!open)}>
        Delete Post
      </Button>
      {open && form}
    </div>
  );
}
