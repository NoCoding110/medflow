
import { toast } from "@/components/ui/use-toast";

export const handleActionWithToast = async (
  action: () => Promise<void>,
  successMessage: string,
  errorMessage: string = "An error occurred"
) => {
  try {
    await action();
    toast({
      title: "Success",
      description: successMessage,
      variant: "default",
    });
    return true;
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    return false;
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
