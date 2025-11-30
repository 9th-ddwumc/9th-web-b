import type { Language } from "../types/movies";

interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: Language;
  onChange: (value: Language) => void;
  options: LanguageOption[];
  className?: string;
}

const LanguageSelector = ({ value, onChange, options, className = "" }: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Language)}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
