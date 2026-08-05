interface Props {
  value: string;
  onChange(value: string): void;
}

export default function SearchInput({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search username..."
      className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none"
    />
  );
}