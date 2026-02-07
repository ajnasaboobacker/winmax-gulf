import { Users } from "lucide-react";

const BlogUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-slate-400 mt-1">Manage blog authors and their roles</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">User Management Coming Soon</h3>
        <p className="text-slate-400">
          Assign roles and manage permissions for blog contributors.
        </p>
      </div>
    </div>
  );
};

export default BlogUsers;
