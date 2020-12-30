import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './type_casting/movie_type';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

 
  baseUrl = 'https://film-rater.herokuapp.com/'
  baseMovieUrl = this.baseUrl+'api/movies'
  headers = new HttpHeaders({
    'Content-Type':'application/json',
  })
  constructor(
    private HttpClient: HttpClient,
    private cookieService: CookieService
  ) { }
  
  getMovies() {
    return this.HttpClient.get(this.baseMovieUrl, {headers: this.getAuthHaders()});
  }
  getMovie(id: number) {
    return this.HttpClient.get<Movie>(this.baseMovieUrl+'/'+id+'/', {headers: this.getAuthHaders()});
  }
  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.HttpClient.post(this.baseMovieUrl+'/', body, {headers: this.getAuthHaders()});
  }
  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.HttpClient.put(this.baseMovieUrl+'/'+id+'/', body, {headers: this.getAuthHaders()});
  }
  deleteMovie(id: number) {
    return this.HttpClient.delete(this.baseMovieUrl+'/'+id+'/', {headers: this.getAuthHaders()});
  }
  getRate(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.HttpClient.post(this.baseMovieUrl+'/'+movieId+'/rate_movie/', body, {headers: this.getAuthHaders()});
  }
  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.HttpClient.post(this.baseUrl+'auth/', body, {headers: this.headers});
  }
  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.HttpClient.post(this.baseUrl+'api/users/', body, {headers: this.headers});
  }
  getAuthHaders(){
    const token = this.cookieService.get('mr-token')
    return new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: 'Token '+token
    })
  }
}
