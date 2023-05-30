import { Component, OnInit, Input } from '@angular/core';
import { SellingItem } from '../selling-item';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @Input() basketItem: SellingItem;

  note = new FormControl('');

  constructor(
    private pds : ProductService
  ) { }

  ngOnInit(): void {
     
  }

  addNote(){
    this.pds.addNoteToBasketItem(this.note.value, this.basketItem);
  }

  
}
