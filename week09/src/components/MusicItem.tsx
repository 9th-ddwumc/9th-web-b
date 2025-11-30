import { MusicItem } from "../types/music";
import { useCart } from "../context/CartContext";

interface Props {
  music: MusicItem;
}

export default function MusicItemComponent({ music }: Props) {
  const { cart, addItem, removeItem } = useCart();
  const cartItem = cart.find((c) => c.id === music.id);

  return (
    <div className="flex gap-4 items-center py-4 border-b">
      <img src={music.image} className="w-16 h-16 rounded" />

      <div className="flex-1">
        <div className="font-bold">{music.title}</div>
        <div className="text-gray-500 text-sm">{music.artist}</div>
        <div className="mt-1 font-semibold">${music.price}</div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => removeItem(music.id)}>-</button>
        <span>{cartItem?.quantity ?? 0}</span>
        <button onClick={() => addItem(music.id)}>+</button>
      </div>
    </div>
  );
}
