import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  product
  brands
  suppliers
  categories
  tags
  productFormUpdate : FormGroup
  public loading : boolean = false;
  public buttonText : string = 'Submit'

  constructor(
    private modalService: NgbModal,
    private activatedRoute : ActivatedRoute,
    private bps : BProductService,
    private fb : FormBuilder,
    private acs : AccountService,
    private router : Router
  ) { }

  ngOnInit(): void {
     this.getProduct()
     this.getBrand()
     this.getCategories()
     this.getTags()
     this.getSuppliers()
     this.initializeForm()
     //Redirect to product list if form is empty
     if(this.productFormUpdate.value.name == null){
        this.router.navigate(['/mg/products'])
     }
  }

  getProduct():void{
     this.bps.selectedProduct.subscribe(
       (response) => {
         this.product = response
         console.log(this.product)
        }
     )
  }

  initializeForm(){
    this.productFormUpdate = new FormGroup({
      account_id : new FormControl(this.acs.getCurrentUser().account_id),
      name : new FormControl(this.product.name),
      description : new FormControl(this.product.description),
      cost_price : new FormControl(this.product.cost_price),
      selling_price : new FormControl(this.product.selling_price),
      category_id : new FormControl(this.product.category_id),
      barcode : new FormControl(this.product.barcode),
      supplier_id : new FormControl(this.product.supplier_id),
      is_variable_price : new FormControl(this.product.is_variable_price),
      brand_id: new FormControl(this.product.brand_id),
      tax: new FormControl(this.product.tax),
      tag_id: new FormControl(this.product.tag_id),
      visibility: new FormControl(1),
      user_id: new FormControl(this.acs.getCurrentUser().id)
    })
  }

  updateData(successmodal, warningmodal){
    this.loading = true;
    this.buttonText = 'Please wait...'
    const productId = this.activatedRoute.snapshot.paramMap.get('id')
    this.bps.updateProduct(this.productFormUpdate.value, parseInt(productId)).subscribe(
      res => console.log('HTTP response', res),
      err => this.failedResponse(warningmodal),
      () => this.successResponse(successmodal)
    )
  }

  getBrand():void{
    this.bps.getAllBrand(this.acs.getCurrentUser().account_id).subscribe(
      response => this.brands = response 
    )
  }

  getCategories():void{
    this.bps.getAllCategories(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.categories = response;
        console.log(response)
      }
    )
  }

  getTags():void{
    this.bps.getAllTags(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.tags = response;
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

  successResponse(successmodal) {
    this.clear(true, false)
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
      this.productFormUpdate.reset()
      this.initializeForm()
    }
  }

}
