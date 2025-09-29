import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>(); // URL에서 movieId 파라미터 가져오기

  useEffect(() => {
    if (movieId) {
      // TODO: movieId를 사용하여 TMDB API에서 영화 상세 정보를 호출하는 로직 구현
      console.log(`영화 상세 페이지: ${movieId}`);
      // 예시: fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`)
      //   .then(res => res.json())
      //   .then(data => console.log(data));
    }
  }, [movieId]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">영화 상세 정보</h2>
      {movieId ? (
        <p className="text-lg">영화 ID: {movieId}</p>
      ) : (
        <p className="text-lg">영화 ID를 찾을 수 없습니다.</p>
      )}
      {/* TODO: 여기에 영화 상세 정보를 표시하는 UI를 구현하세요. */}
    </div>
  );
};