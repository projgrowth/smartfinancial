import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { error } from "@/utils/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center section-bg-subtle">
      <SEO title="404 Not Found | Smart Financial Planning" description="Page not found." noindex />
      <div className="container-narrow text-center space-component-md">
        <h1 className="heading-xl">404</h1>
        <p className="text-body-lg text-muted-foreground mb-6">Oops! Page not found</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
