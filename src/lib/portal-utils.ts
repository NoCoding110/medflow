// NOTE: To show toasts, use the useToast hook in your React component after calling this function.
export const handleActionWithToast = async (
  action: () => Promise<void>,
  successMessage: string,
  errorMessage: string = "An error occurred"
) => {
  try {
    await action();
    // Show success toast in your component
    return { success: true, message: successMessage };
  } catch (error) {
    console.error(error);
    // Show error toast in your component
    return { success: false, message: errorMessage };
  }
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return `${formatDate(d)} at ${d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};
