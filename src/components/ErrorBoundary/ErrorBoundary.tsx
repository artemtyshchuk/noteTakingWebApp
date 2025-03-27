import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // TODO: Отправить ошибку в Sentry или другой логер
    // Sentry.captureException(error);
  }

  private toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className={styles.reloadButton}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            <button
              className={styles.detailsButton}
              onClick={this.toggleDetails}
            >
              {this.state.showDetails ? "Hide Details" : "Show Details"}
            </button>
            {this.state.showDetails && (
              <pre className={styles.errorDetails}>
                {this.state.error?.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
