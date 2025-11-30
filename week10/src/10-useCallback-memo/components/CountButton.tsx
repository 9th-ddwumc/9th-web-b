import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton rendered");
  return (
    <button className="border p-2 rounded-lg" onClick={() => onClick(1)}>
      카운트 증가
    </button>
  );
};

export default memo(CountButton);
