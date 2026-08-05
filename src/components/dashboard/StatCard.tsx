interface Props {
  title: string;
  value: number;
  active: boolean;
  onClick: () => void;
}

export default function StatCard({
  title,
  value,
  active,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full min-h-16 w-full flex-col justify-between rounded-lg border p-2.5 text-left shadow-sm shadow-black/20 transition-all sm:p-3 ${
        active
          ? "border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-500/10"
          : "border-neutral-800 bg-neutral-900/80 hover:border-neutral-700 hover:bg-neutral-800/70"
      }`}
    >
      <div className={`text-[11px] font-medium uppercase tracking-[0.2em] ${active ? "text-blue-400" : "text-neutral-500"}`}>
        {title}
      </div>

      <div className={`mt-1 text-base font-semibold tabular-nums sm:text-lg ${active ? "text-white" : "text-neutral-100"}`}>
        {value}
      </div>
    </button>
  );
}