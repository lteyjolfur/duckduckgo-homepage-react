'use client';
import React from 'react';
import '../styles/error-boundary.css';
import Card from './card';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here or send to a service
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card className="error-boundary-fallback">
            <h2 className="error-boundary-title">
              Oops! Something went wrong.
            </h2>
            <p className="error-boundary-message">
              Sorry, an unexpected error occurred.
              <br />
              This project is a portfolio demo and may have some rough edges.
              <br />
              Please try reloading the page.
            </p>
            <button
              className="error-boundary-reload"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            <pre className="error-boundary-details">
              {this.state.error?.message}
            </pre>
          </Card>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
