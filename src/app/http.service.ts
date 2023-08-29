import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

   

  saveTransaction(data:any):Observable<any>{
    const url =`${environment.baseUrl}/transaction/save`;
    return this.http.post(url, data).pipe(
      tap(data => console.log(data)),
            catchError(this.handleError)
    )
  }

  getTransactionRates(toCurrency: string, amount: number): Observable<any>{
    const url =` ${environment.baseUrl}/transaction/rates?fromCurrency=INR&toCurrency=${toCurrency}&amount=${amount}`;
    return this.http.get(url).pipe(
      tap(data=> console.log(data)),
      catchError(this.handleError)
    )
  }

  
postRecieverDetails(formData:any) {
  return this.http.post(`${environment.baseUrl+'beneficiary/add'}` ,formData);
}

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
