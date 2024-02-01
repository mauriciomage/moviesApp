import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonBadge,
  IonLabel,
  IonAvatar,
  IonItem,
  IonList,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSkeletonText,
  IonAlert,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiResult } from '../interfaces/interface';
import { ErrorModel } from '../interfaces/error';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonBadge,
    IonAvatar,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    IonAlert,
    DatePipe,
    RouterModule,
  ],
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService);

  private currentPage = 1;
  public movies: any[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public isLoading = true;
  public error: ErrorModel | null = null;
  public dummyArray = new Array(5);

  // Load the first page of movies during component initialization
  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    // Only show loading indicator on initial load
    if (!event) {
      this.isLoading = true;
    }

    // Get the next page of movies from the MovieService
    this.movieService
      .getTopRatedMovies(this.currentPage)
      .subscribe({
        next: (res: ApiResult) => {
          this.isLoading = false;
          this.movies.push(...res.results);

          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
        error: ((err: ErrorModel) => {
          this.isLoading = false;
          this.error = err;
         
          return [];
        })
      },
      );
  }

  // This method is called by the infinite scroll event handler
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}