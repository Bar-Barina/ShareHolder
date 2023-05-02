import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  of,
  switchMap,
  interval,
  timer,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { ChartData } from '../models/chart-data.model';
const ENTITY = 'data';
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  public fetchData(str: string): Observable<ChartData> {
    let url;
    const data = JSON.parse(localStorage.getItem(str) || 'null');
    if (data || data?.length) return of(data); // return cached data if it exists

    url = `https://api.blockchain.info/charts/${str}?timespan=5months&format=json&cors=true`;
    return this.http.get<ChartData>(url).pipe(
      tap((response) => {
        localStorage.setItem(str, JSON.stringify(response)); // save to local storage
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => 'Something bad happened; please try again later.');
  }

  public getRate = (): Observable<string> => {
    let url = `https://blockchain.info/tobtc?currency=USD&value=1`;
    return this.http.get<string>(url);
  };

  public getRateStream(): Observable<string> {
    return timer(0, 60000).pipe(switchMap(this.getRate));
  }

  public getMArketPrice() {}
  public getConfirmedTransactions() {}
}
