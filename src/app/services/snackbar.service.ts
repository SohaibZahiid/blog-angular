import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Snackbar
  openSuccessSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000, // snackbar will close after 3 seconds
      panelClass: ['green-snackbar'], // add a custom CSS class to the snackbar
    });
  }

  openFailSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      panelClass: ['red-snackbar'],
    });
  }
}
