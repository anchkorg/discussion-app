import  { db } from  '@/db';
import { notFound } from 'next/navigation';
import PostDeleteForm from './post-delete-form';
import PostEditForm from './post-edit-form';
import CommentCreateForm from '../comments/comment-create-form';

interface PostShowProps {
  slug: string;
  postId: string;
}

export default async function PostShow({ slug, postId }: PostShowProps) {

  const post = await db.post.findFirst({
    where: { id: postId }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold my-2">{post.title}</h1>
        <div className="flex items-center gap-2">
          <PostEditForm postId={postId} slug={slug}/>
          <PostDeleteForm postId={postId}/>
        </div>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <p className="text-gray-700 text-base leading-7 whitespace-pre-wrap">{post.content}</p>
      </div>
      <div>
        { <CommentCreateForm postId={postId} startOpen /> }
      </div>
    </div>
  );
}
