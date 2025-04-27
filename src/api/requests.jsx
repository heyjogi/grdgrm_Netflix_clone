import { IMAGE_BASE_URL } from "./config";

//각자 필요한 api 추가하시면 됩니다
//https://developer.themoviedb.org/reference/intro/getting-started
const requests = {
  fetchMoviePopular: `/movie/popular`,
  fetchMovieTopRated: `/movie/top_rated`,
  fetchNowPlaying: `/movie/now_playing`,
  fetchUpcomingMovies: `/movie/upcoming`,
  fetchActionMovies: `/discover/movie?with_genres=28`,
  fetchComedyMovies: `/discover/movie?with_genres=35`,
  fetchHorrorMovies: `/discover/movie?with_genres=27`,
  fetchAnimationMovies: `/discover/movie?with_genres=16`,
  fetchFantasyMovies: `/discover/movie?with_genres=14`,
  fetchDocumentaryMovies: `/discover/movie?with_genres=99`,
  fetchSciFiMovies: `/discover/movie?with_genres=878`,
  fetchFamilyMovies: `/discover/movie?with_genres=10751`,
  fetchCrimeMovies: `/discover/movie?with_genres=80`,
  fetchDramaMovies: `/discover/movie?with_genres=18`,

  // TV (시리즈/드라마)
  fetchSeriesPopular: `/tv/popular`,
  fetchSeriesTopRated: `/tv/top_rated`,
  fetchActionMovies: `/discover/movie?with_genres=28`,
  fetchDramaMovies: `/discover/movie?with_genres=18`,
  fetchAnimeSeries: `/discover/tv?with_genres=16`,
  fetchFantasySeries: `/discover/tv?with_genres=10765`,
  fetchDocumentarySeries: `/discover/tv?with_genres=99`,
  fetchSciFiSeries: `/discover/tv?with_genres=10765`,
  fetchCrimeSeries: `/discover/tv?with_genres=80`,
  fetchDramaSeries: `/discover/tv?with_genres=18`,
  fetchFamilySeries: `/discover/tv?with_genres=10751`,

  // 검색
  fetchSearchMovies: (query) =>
    `/search/movie?query=${encodeURIComponent(query)}`,
  fetchSearchTV: (query) => `/search/tv?query=${encodeURIComponent(query)}`,
  fetchSearchMulti: (query) =>
    `/search/multi?query=${encodeURIComponent(query)}`,
};

export default requests;
