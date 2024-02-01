import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { delay, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from '../interfaces/interface';
import { throwError } from 'rxjs';
import { ErrorModel } from '../interfaces/error';
import { ErrorHandlerService } from './error.handler';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private http: HttpClient, private  errorHandler: ErrorHandlerService) {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http
      .get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
      .pipe(
        delay(2000),
        catchError((err: ErrorModel) => {
          return throwError(this.errorHandler.handleError(err.status));
        })
      );
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }
}
