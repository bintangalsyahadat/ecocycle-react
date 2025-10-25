import React, { useEffect, useState } from "react";

export default function PageLoader({ className, children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-(--main-color)">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-(--main-color) overflow-hidden">
          <div className="expand-circle circle-1"></div>
          <div className="expand-circle circle-2"></div>
          <div className="expand-circle circle-3"></div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        } ` + className}
      >
        {children}
      </div>
    </div>
  );
}
