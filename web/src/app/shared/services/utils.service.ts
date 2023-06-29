import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { throwError } from 'rxjs';

import { DialogComponent } from '../components/dialog/dialog.component';
import { environment } from '@environments/environment';

@Injectable()
export class UtilsService {
  private _url: string;

  constructor(
    private _http: HttpClient,
    private dialog: MatDialog,
  ) {
    this._url = environment.apiUrl;
  }

  handleErrorHttp(response: HttpErrorResponse) {
    if (response.error instanceof ErrorEvent || response.error !== null) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
      return throwError(response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
  }

  showDialog(settings: MatDialogConfig<{
    title: string,
    message: string,
    onConfirm?: () => void,
  }>): void {
    const dialogRef = this.dialog.open(DialogComponent, settings);
    dialogRef.afterClosed().subscribe(result => {
      if (result && settings.data?.onConfirm) {
        settings.data.onConfirm();
      }
    });
  }

  formatDate(value: Date): string {
    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
  }
}
