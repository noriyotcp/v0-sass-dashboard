export default function FullscreenModal({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <dialog
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-neutral-200 bg-opacity-50"
      open
    >
      {children ? (
        children
      ) : (
        <div className="relative flex flex-col items-center w-full max-w-md p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}
