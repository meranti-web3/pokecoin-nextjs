export default function Button({ children, isDisabled, onClick, className }: any) {
  return (
    <button
      disabled={isDisabled}
      type="button"
      onClick={onClick}
      className={
        "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white " +
        className
      }
    >
      {children}
    </button>
  );
}
