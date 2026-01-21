import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Divider } from '@heroui/divider';
import PostList from "@/components/posts/post-list";
import { fetchTopPosts, getTopTopicsWithMostComments } from "@/db/queries/posts";
import TopicTopList from "@/components/topics/topic-top-list";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-start-3 lg:row-span-2 border shadow py-3 px-2 flex flex-col gap-2 rounded-lg">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
      <div className="lg:col-span-2">
        <h1 className="text-xl m-2">Top Topics</h1>
        <TopicTopList fetchData={getTopTopicsWithMostComments} />
      </div>
      <div className="lg:col-span-2">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
    </div>
  );
}
