"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentDeleteFormProps {
    commentId: string;
    startOpen?: boolean;
}

export default function CommentDeleteForm({
    commentId,
    startOpen,
}: CommentDeleteFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.deleteComment.bind(null, { commentId }),
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

        <FormButton isLoading={isPending}>Confirmed delete Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" color="danger" variant="light" onPress={() => setOpen(!open)}>
        Delete Comment
      </Button>
      {open && form}
    </div>
  );
}
