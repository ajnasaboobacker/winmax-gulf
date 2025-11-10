import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Production: Log errors to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <AlertTriangle className="h-20 w-20 text-winmax-orange mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 p-4 bg-muted rounded-lg text-left">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-destructive overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light"
                onClick={this.handleReset}
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-winmax-orange text-winmax-orange"
                onClick={this.handleGoHome}
              >
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              If the problem persists, please{' '}
              <a
                href="/#contact"
                className="text-winmax-orange hover:underline"
              >
                contact our support team
              </a>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
