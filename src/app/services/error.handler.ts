import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  constructor(){}

  public handleError(error: number): string {
    switch(error) {
      
      case 404:
        return 'The request/page you called was not found';
      
      case 400: 
        return 'There is an error on the request, please try again later';
      
      case 500: 
        return 'Something is wrong in our side. Would you mind to try later?'
      
      default: 
        return 'Something is completely wrong. Please try again. Otherwise close the app.'
      
    }
  }
  
}