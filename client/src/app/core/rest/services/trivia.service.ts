import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category.model'; // Modelo de categorías
import { Resource } from '../rest.resources';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TriviaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get(`${this.apiUrl}/${Resource.CATEGORIES}`)
      .pipe(map((response: any) => response.data));
  }

  getQuestionsByCategory(categoryId: string, difficulty: string): Observable<Array<any>> {
    return this.http.get(`${this.apiUrl}/${Resource.QUESTIONS}?category=${categoryId}&difficulty=${difficulty}`)
      .pipe(map((response: any) => response.data));
  }


}
