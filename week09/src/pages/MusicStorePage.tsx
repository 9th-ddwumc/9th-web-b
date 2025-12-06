import MusicItemComponent from "../components/MusicItem/MusicItem";
import { dummyData } from "../mock/musicData";
import { useCart } from "../context/CartContext";

export default function MusicStorePage() {
  const { clear } = useCart();

  return (
    <>
      <h1 className="text-xl font-bold">Ohtani Ahn</h1>

      <div className="mt-4">
        {dummyData.map((music) => (
          <MusicItemComponent key={music.id} music={music} />
        ))}
      </div>

      <div className="py-12 flex justify-center">
        <button className="border px-6 py-2 rounded" onClick={clear}>
          전체 삭제
        </button>
      </div>
    </>
  );
}
