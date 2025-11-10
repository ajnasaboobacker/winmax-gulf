import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Production: Log 404 errors for monitoring (consider using analytics service)
    if (process.env.NODE_ENV === 'development') {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-9xl font-bold text-winmax-orange mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light"
              onClick={() => window.location.href = '/'}
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-winmax-orange text-winmax-orange"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Looking for our services? Visit <a href="/#services" className="text-winmax-orange hover:underline">our services page</a> or <a href="/#contact" className="text-winmax-orange hover:underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
