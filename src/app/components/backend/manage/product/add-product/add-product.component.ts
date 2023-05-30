import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  
  message = null; 
  public categories
  public brands
  public suppliers;
  productForm: FormGroup;
  public loading : boolean = false;
  public buttonText : string = 'Submit'

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private bps : BProductService,
    private acs : AccountService
    ) { }

    ngOnInit(): void {
      this.getCategories()
      this.getBrand()
      this.getSuppliers()
      this.initializeForm()
    }
  
    initializeForm(): void{
      this.productForm = this.fb.group({
        account_id : this.acs.getCurrentUser().account_id,
        name : [''],
        description : [''],
        cost_price : [''],
        selling_price : [''],
        image : [''],
        category_id : [],
        barcode : [''],
        popup_note_id: [6],
        status : [''],
        supplier_id : [''],
        is_variable_price : [],
        colour_id: [4],
        brand_id: [],
        tax: [''],
        tag_id: [],
        visibility: 1,
        is_deleted : 0,
        user_id: this.acs.getCurrentUser().id
      })
    }
  
    onSubmit(successmodal, warningmodal): void{
      this.loading = true;
      this.buttonText = 'Please wait...'
      this.bps.addProduct(this.productForm.value)
      .subscribe(
        //message => console.log(message)
        res => console.log('HTTP response', res),
        err => this.failedResponse(warningmodal),
        () => this.successResponse(successmodal)
      );
      
      console.log(this.productForm.value);
      
    }

    getCategories():void{
      this.bps.getAllCategories(2).subscribe(
        (response) => {
          this.categories = response;
          console.log(response)
        }
      )
    }

    getSuppliers(): void{
      this.bps.getAllSuppliers(2).subscribe(
        (response) => {
          this.suppliers = response
          console.log(response)
        }
      )
   }

   getBrand():void{
    this.bps.getAllBrand(this.acs.getCurrentUser().account_id).subscribe(
      response => this.brands = response
    )
  }

    successResponse(successmodal) {
      this.clear(true, true)
      this.modalService.open(successmodal, { centered: true });
    }

    failedResponse(warningmodal) {
      this.clear(true, false)
      this.modalService.open(warningmodal, { centered: true });
    }

    clear(updateButton : boolean, resetForm : boolean){
      if(updateButton){
        this.loading = false;
        this.buttonText = 'Submit'
      }
      if(resetForm){
        this.productForm.reset()
        this.initializeForm()
      }
    }

  modalOpen(basicmodal){
    this.modalService.open(basicmodal);
  }

}
