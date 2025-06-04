import React, { useState, useEffect } from 'react';
import Loader from '../components/common/loader';
import ErrorDisplay from '../components/common/errorDisplay';
import Skeleton from '../components/common/skeleton';
import CardSkeleton from '../components/common/skeleton';
import LoadingButton from '../components/common/loading-button';

const DummyTestComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);

      // Simulate error
      setIsError(true); // Set this to false to see the success state
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);

    setTimeout(() => {
      setIsLoading(false);
      setIsError(true); // again set true for demo; you can try false too
    }, 1500);
  };

  if (isLoading) return <LoadingButton></LoadingButton>;

  if (isError)  
    return (
      <ErrorDisplay
        error={{ message: 'This is a simulated error for testing.' }}
        onRetry={handleRetry}
      />
    );

  return <div className="p-4 text-green-600">✅ Success! Data Loaded.</div>;
};

export default DummyTestComponent;
