import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMovie from './movie.reducer';
export interface AppState {
  movies: fromMovie.MovieState;
}
export const reducers: ActionReducerMap<AppState> = {
  movies: fromMovie.reducer,
};
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export const getNoteState = (state: AppState) => state.movies;
export const getAllNotes = createSelector(getNoteState, fromMovie.getMovies);
export const getNoteById = createSelector(getNoteState, fromMovie.getMovieById);