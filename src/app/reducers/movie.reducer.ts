import * as fromMovie from '../actions/movie.actions';
import { MovieResult } from '../interfaces/interface';
export interface MovieState {
  data: MovieResult[];
}
export const initialState: MovieState = {
  data: [],
};
export function reducer(
  state = initialState,
  action: fromMovie.ActionsUnion
): MovieState {
  switch (action.type) {
    case fromMovie.ActionTypes.AddWishMovie: {
      return {
        ...state,
        data: [...state.data, action.payload.movie],
      };
    }
    case fromMovie.ActionTypes.DeleteWishMovie: {
      return {
        ...state,
        ...state.data.splice(state.data.indexOf(action.payload.movie), 1),
      };
    }
    default: {
      return state;
    }
  }
}

export const getMovies = (state: MovieState) => state.data;
export const getMovieById = (state: MovieState, props: { id: number }) =>
  state.data.find((movie) => movie.id === props.id);