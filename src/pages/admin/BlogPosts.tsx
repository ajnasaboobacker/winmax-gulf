import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

const BlogPosts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Posts</h1>
          <p className="text-slate-400 mt-1">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Post Management Coming Soon</h3>
        <p className="text-slate-400 mb-4">
          The full post editor with rich text capabilities is being built.
        </p>
        <Button asChild>
          <Link to="/admin/blog/posts/new">Create First Post</Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPosts;
