import { Tags } from "lucide-react";

const BlogTags = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Tags</h1>
        <p className="text-slate-400 mt-1">Manage tags for your blog posts</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <Tags className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Tag Management Coming Soon</h3>
        <p className="text-slate-400">
          Create and manage tags to help readers discover related content.
        </p>
      </div>
    </div>
  );
};

export default BlogTags;
