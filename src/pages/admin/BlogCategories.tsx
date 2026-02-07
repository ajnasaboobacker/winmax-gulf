import { FolderOpen } from "lucide-react";

const BlogCategories = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <p className="text-slate-400 mt-1">Organize your blog posts into categories</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <FolderOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Category Management Coming Soon</h3>
        <p className="text-slate-400">
          Create and manage categories to organize your blog content.
        </p>
      </div>
    </div>
  );
};

export default BlogCategories;
