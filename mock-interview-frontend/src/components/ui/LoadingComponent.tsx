import { Loader, Loader2 } from "lucide-react";

const LoadingComponent = ({ msg }: { msg: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="animate-spin h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg text-gray-600">{msg}</p>
    </div>
  );
};

export default LoadingComponent;
