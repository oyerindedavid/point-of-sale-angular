import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'simple-datatables';
import { DataTable2, SimpleDataTable } from 'src/app/shared/data/tables/data-table';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  public products;
  public selectedProduct;

  constructor(
    private modalService: NgbModal,
    private bps : BProductService,
    private acs : AccountService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.bps.getAllProducts().subscribe(
       (response) => {
         this.products = response;
         console.log(response)
        }
    )
  }

  selectProduct(index){
    this.selectedProduct =  this.products[index];
    this.bps.productSource.next(this.selectedProduct)
    console.log(this.selectedProduct)
  }

  deleteProduct():void{
    this.bps.deleteProduct(this.acs.getCurrentUser().account_id, this.selectedProduct.id).subscribe(
      (response) => {
        console.log(response)
        this.modalService.dismissAll('close modal')
        this.ngOnInit()
      }
    )
  }

  confirmDelete(basicmodal, index) {
    this.selectProduct(index)
    this.modalService.open(basicmodal);
    
  }
}
