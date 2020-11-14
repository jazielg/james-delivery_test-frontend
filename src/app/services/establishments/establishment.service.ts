import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Establishment } from 'src/app/models/Establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private apiUrl =
    'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getEstablishments(): Observable<Establishment[]> {
    const establishmentStorage = localStorage.getItem('establishments');

    if (establishmentStorage) {
      const establishmentJSON = JSON.parse(establishmentStorage);
      return of(establishmentJSON);
    }

    return this.http.get<Establishment[]>(this.apiUrl).pipe(
      tap((response) =>
        localStorage.setItem('establishments', JSON.stringify(response))
      ),
      catchError(this.handleError<Establishment[]>('getEstablishments', []))
    );
  }

  getEstablishment(id: string): Observable<Establishment> {
    const url = `${this.apiUrl}/${id}`;
    const establishmentStorage = localStorage.getItem('establishments');

    if (establishmentStorage) {
      const establishmentJSON = JSON.parse(establishmentStorage);

      const establishmentResult = establishmentJSON.find(
        (establishment) => id === establishment.id
      );

      return of(establishmentResult);
    }

    return this.http
      .get<Establishment>(url)
      .pipe(catchError(this.handleError<Establishment>('getEstablishment')));
  }

  updateEstablishment(
    establishmentData: Establishment
  ): Observable<Establishment> {
    const establishmentStorage = localStorage.getItem('establishments');

    if (establishmentStorage) {
      const establishmentJSON = JSON.parse(establishmentStorage);

      const index = establishmentJSON.findIndex(
        (establishment) => establishmentData.id === establishment.id
      );

      establishmentJSON[index] = establishmentData;

      localStorage.setItem('establishments', JSON.stringify(establishmentJSON));

      return of(establishmentJSON[index]);
    }

    return of();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
