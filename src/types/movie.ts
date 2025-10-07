export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  // 상세 페이지용 추가 필드
  runtime?: number;
  tagline?: string;
  genres?: { id: number; name: string }[];
  budget?: number;
  revenue?: number;
};

export interface Person {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string;
}

export interface Credits {
  cast: Person[];
  crew: Person[];
}