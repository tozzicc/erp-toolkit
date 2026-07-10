type CopyToastProps = {
  message: string;
};

export function CopyToast({ message }: CopyToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 rounded-lg border border-brand-100 bg-white px-4 py-3 text-sm font-medium text-brand-700 shadow-soft"
    >
      {message}
    </div>
  );
}
