import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../type_casting/movie_type';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  movies: Movie[] = [];
  selectedMovie = null;
  editedMovie = null;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const curToken = this.cookieService.get('mr-token');
    if (!curToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        error => 
          console.log(error)
      );
    }
  }
    logOut() {
      this.cookieService.delete('mr-token');
      this.router.navigate(['/auth']);
    }
    selectMovie(movie: Movie) {
      this.selectedMovie = movie; 
      this.editedMovie = null;  
  } 
    editMovie(movie: Movie) {
      this.editedMovie = movie;
      this.selectedMovie = null;
    }

    createNewMovie() {
      this.editedMovie = {title: '', description: ''};
      this.selectedMovie = null;
    }

    deletedMovie(movie: Movie) {
      this.apiService.deleteMovie(movie.id).subscribe(
        data => {
          this.movies = this.movies.filter(mov => mov.id !== movie.id);
        },
        error => console.log(error)
      );
    }
    movieCreated(movie: Movie) {
      this.movies.push(movie);
    }
    movieUpdated(movie: Movie) {
      const index = this.movies.findIndex( mov => mov.id === movie.id);
      if (index >= 0) {
        this.movies[index] = movie;
      }
    }
}

