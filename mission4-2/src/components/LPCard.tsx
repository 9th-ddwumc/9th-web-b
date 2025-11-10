import type { LP } from "../types/response";
interface LPCardProps {
  lp: LP;
}

const LPCard = ({ lp }: LPCardProps) => {
  // 40:40
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={lp.thumbnail} alt={lp.title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LPCard;
