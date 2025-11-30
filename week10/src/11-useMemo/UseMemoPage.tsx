import { useMemo, useState } from "react";
import TextInput from "../10-useCallback-memo/components/TextInput";
import { findPrimeNumbers } from "./utils/math";

export default function UseMemoPage() {
  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleChangeText = (text: string): void => {
    setText(text);
  };

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div className="flex flex-col gap-4">
      <h1>같이 배우는 리액트: useMemo편</h1>

      <label>
        숫자 입력 (소수 찾기):
        <input value={limit} className="border p-4 rounded-lg" onChange={(e) => setLimit(Number(e.target.value))} />
      </label>

      <h2>소수 리스트: </h2>
      <div className="flex flex-wrap gap-2">
        {primes.map((prime) => (
          <div key={prime}>{prime}</div>
        ))}
      </div>

      <label>
        다른 입력 테스트:
        <TextInput onChange={handleChangeText} />
      </label>

      <div>{text}</div>
    </div>
  );
}
