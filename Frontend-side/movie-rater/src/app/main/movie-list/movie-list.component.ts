import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../type_casting/movie_type';
import {faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() selectedMovie = new EventEmitter<Movie>();
  @Output() editedMovie = new EventEmitter<Movie>();
  @Output() createdNewMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter<Movie>();


  edit = faEdit;
  trash = faTrash;

  constructor() { }

  ngOnInit(): void {}
  
  clickMovie(movie: Movie) {
    this.selectedMovie.emit(movie);
  }
  
  editMovie(movie: Movie) {
    this.editedMovie.emit(movie);
  }
  
  newMovie() {
    this.createdNewMovie.emit();
  }
  deleteMovie(movie: Movie) {
    this.deletedMovie.emit(movie);
  }
}
    


