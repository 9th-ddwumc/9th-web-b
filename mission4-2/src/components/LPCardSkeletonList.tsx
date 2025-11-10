import LPCardSkeleton from "./LPCardSkeleton";

interface LPCardSkeletonListProps {
  count: number; // 렌더링할 스켈레톤 카드의 개수
}

const LPCardSkeletonList = ({ count }: LPCardSkeletonListProps) => {
  // 44:59
  return (
    <>
      {" "}
      {/* Fragment를 사용하여 불필요한 DOM 요소 생성을 방지 */}
      {/* `new Array(count).fill(0)`을 통해 `count`만큼의 빈 배열을 생성하고 매핑 */}
      {new Array(count).fill(0).map(
        (
          _,
          index // 45:21
        ) => (
          <LPCardSkeleton key={index} /> // 각 스켈레톤 카드를 렌더링하고 `key`를 부여 (45:50)
        )
      )}
    </>
  );
};

export default LPCardSkeletonList;
