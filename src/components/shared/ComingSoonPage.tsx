
import React from "react";

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage = ({ title }: ComingSoonPageProps) => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
      <div className="p-12 border rounded-lg bg-muted/50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          This feature is currently under development and will be available in a future update.
        </p>
        <div className="h-2 w-64 bg-gray-200 rounded overflow-hidden">
          <div className="h-full w-1/3 bg-purple-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
