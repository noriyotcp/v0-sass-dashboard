"use client";

import { useEffect, useRef } from "react";

export default function FullscreenLoading() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center w-full max-w-md p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Deleting Post</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    </div>
  );
};
