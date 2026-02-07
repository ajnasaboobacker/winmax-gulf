import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FolderOpen, Tags, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  categories: number;
  tags: number;
}

const BlogDashboard = () => {
  const { user, userRole } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    categories: 0,
    tags: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch post counts
        const { data: posts, error: postsError } = await supabase
          .from("blog_posts")
          .select("id, status");

        if (postsError) throw postsError;

        const publishedCount = posts?.filter((p) => p.status === "published").length || 0;
        const draftCount = posts?.filter((p) => p.status === "draft").length || 0;

        // Fetch category count
        const { count: categoryCount } = await supabase
          .from("blog_categories")
          .select("*", { count: "exact", head: true });

        // Fetch tag count
        const { count: tagCount } = await supabase
          .from("blog_tags")
          .select("*", { count: "exact", head: true });

        // Fetch recent posts
        const { data: recent } = await supabase
          .from("blog_posts")
          .select("id, title, status, created_at, published_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalPosts: posts?.length || 0,
          publishedPosts: publishedCount,
          draftPosts: draftCount,
          categories: categoryCount || 0,
          tags: tagCount || 0,
        });

        setRecentPosts(recent || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Published",
      value: stats.publishedPosts,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Drafts",
      value: stats.draftPosts,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: FolderOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Tags",
      value: stats.tags,
      icon: Tags,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: "bg-green-500/20 text-green-400",
      draft: "bg-yellow-500/20 text-yellow-400",
      scheduled: "bg-blue-500/20 text-blue-400",
      archived: "bg-slate-500/20 text-slate-400",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Welcome back! Here's an overview of your blog.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {isLoading ? "—" : stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Posts</CardTitle>
              <CardDescription className="text-slate-400">
                Your latest blog posts
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/blog/posts">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-700 rounded animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 mb-4">No posts yet</p>
              <Button asChild>
                <Link to="/admin/blog/posts/new">Create your first post</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/admin/blog/posts/${post.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{post.title}</h4>
                    <p className="text-sm text-slate-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(post.status)}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
          <Link to="/admin/blog/posts/new">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Create Post</h3>
                <p className="text-sm text-slate-400">Write a new blog post</p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
          <Link to="/admin/blog/categories">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <FolderOpen className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage Categories</h3>
                <p className="text-sm text-slate-400">Organize your content</p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
          <Link to="/admin/blog/tags">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-pink-500/10">
                <Tags className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage Tags</h3>
                <p className="text-sm text-slate-400">Label your posts</p>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default BlogDashboard;
