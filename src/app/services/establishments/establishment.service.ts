import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Establishment } from 'src/app/models/Establishment';
import { MessageService } from 'src/app/services/messages/message.service';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private apiUrl =
    'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  establishmentStorage = localStorage.getItem('establishments');

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getEstablishments(): Observable<Establishment[]> {
    if (this.establishmentStorage) {
      const establishmentJSON = JSON.parse(this.establishmentStorage);
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

    if (this.establishmentStorage) {
      const establishmentJSON = JSON.parse(this.establishmentStorage);

      const establishmentResult = establishmentJSON.find(
        (establishment) => id === establishment.id
      );

      if (establishmentResult) {
        return of(establishmentResult);
      }

      this.log(`Error`, `Establishment not found!`);

      return of();
    }

    return this.http
      .get<Establishment>(url)
      .pipe(catchError(this.handleError<Establishment>('getEstablishment')));
  }

  updateEstablishment(
    establishmentData: Establishment
  ): Observable<Establishment> {
    if (this.establishmentStorage) {
      const establishmentJSON = JSON.parse(this.establishmentStorage);

      const index = establishmentJSON.findIndex(
        (establishment) => establishmentData.id === establishment.id
      );

      establishmentJSON[index] = establishmentData;

      localStorage.setItem('establishments', JSON.stringify(establishmentJSON));

      this.log(`Success!`, `Establishment updated!`);

      return of(establishmentJSON[index]);
    }

    return of();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed`, `${error.message}`);

      return of(result as T);
    };
  }

  private log(title: string, message: string) {
    this.messageService.add(title, message);
  }
}
