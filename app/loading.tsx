import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader size={40} className="animate-spin" />
        </div>
    );
};

export default LoadingPage;
