
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TVariables>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);
  
  const mutate = async (variables: TVariables, {
    successMessage,
    errorMessage
  }: {
    successMessage?: string,
    errorMessage?: string
  } = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await mutationFn(variables);
      setData(result);
      options?.onSuccess?.(result, variables);
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
          variant: "default",
        });
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      options?.onError?.(error, variables);
      
      if (errorMessage) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    mutate,
    isLoading,
    error,
    data
  };
};
