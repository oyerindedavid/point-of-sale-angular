import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    console.log('Routing to print page')
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}]);
      //router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
