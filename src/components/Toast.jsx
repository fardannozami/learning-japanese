export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-[#1B2340] text-white text-[12px] font-semibold shadow-xl border border-white/10 pointer-events-none">
      {message}
    </div>
  );
}
