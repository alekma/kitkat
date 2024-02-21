import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatFactsService {
  private apiUrl = 'https://meowfacts.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getFacts(): Observable<string> {
    return this.http
      .get<{ data: string[] }>(this.apiUrl)
      .pipe(map((response) => response.data[0]));
  }
}
