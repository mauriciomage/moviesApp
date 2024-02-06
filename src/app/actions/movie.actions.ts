import { Action } from "@ngrx/store";
import { MovieResult } from "../interfaces/interface";
export enum ActionTypes {
  AddWishMovie = "[Movies Service] Create wish movie",
  DeleteWishMovie = "[Movies Service] Delete wish movie"
}
export class CreateNote implements Action {
  readonly type = ActionTypes.AddWishMovie;
  constructor(public payload: { movie: MovieResult }) {}
}
export class DeleteNote implements Action {
  readonly type = ActionTypes.DeleteWishMovie;
  constructor(public payload: { movie: MovieResult }) {}
}
export type ActionsUnion = CreateNote | DeleteNote;