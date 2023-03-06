const StateHandler = ({
  hasError,
  isLoading,
  fallbackLoading,
  fallbackError,
  children,
}) => {
  if (isLoading) {
    return fallbackLoading;
  }
  if (hasError) {
    return fallbackError;
  }
  return children;
};

export default StateHandler;
