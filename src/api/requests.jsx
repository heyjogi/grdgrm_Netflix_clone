import { IMAGE_BASE_URL } from "./config";

//각자 필요한 api 추가하시면 됩니다
//https://developer.themoviedb.org/reference/intro/getting-started
const requests = {
  fetchMoviePopular: `/movie/popular`,
  fetchMovieTopRated: `/movie/top_rated`,
  fetchSeriesPopular: `/tv/popular`,
  fetchSeriesTopRated: `/tv/top_rated`,
};

export default requests;
