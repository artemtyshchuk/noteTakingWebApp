import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorTitle}>
            {error.status} {error.statusText}
          </h2>
          <p className={styles.errorMessage}>
            {error.data?.message || "Something went wrong with the route"}
          </p>
          <button
            className={styles.reloadButton}
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>Oops!</h2>
        <p className={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <button
          className={styles.reloadButton}
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
