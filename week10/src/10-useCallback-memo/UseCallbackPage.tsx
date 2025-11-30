import { useCallback, useState } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },
    [count] // count가 바뀌면 새로운 함수가 생성되도록
  );

  const handleText = useCallback(
    (text: string): void => {
      setText(text);
    },
    [text]
  );

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>{count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text</h2>
      <div className="flex flex-col">
        <span>{text}</span>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
}
