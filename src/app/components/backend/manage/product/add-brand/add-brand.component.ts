import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BProductService } from '../../../b-product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  public loading : boolean;
  public buttonText : string = 'Submit'
  public errorCaption : string = " Failed to add brand!"
  public errorMessage : string = "There was an error response while trying to add the brand, please try again."

  constructor(
    private modalService: NgbModal,
    private acs : AccountService,
    private bps : BProductService
  ) { }

  ngOnInit(): void {
  }

  brandForm =  new FormGroup({
    brand_name: new FormControl(''),
    is_deleted : new FormControl(0),
    account_id : new FormControl(this.acs.getCurrentUser().account_id),
    user_id : new FormControl(this.acs.getCurrentUser().id)
  })

  addBrand(successmodal, warningmodal):void{
    this.loading = true;
    this.buttonText = 'Please wait...'
    this.bps.addBrand(this.brandForm.value).subscribe(
      res => console.log(),
      err => this.failedResponse(warningmodal, err),
      () => this.successResponse(successmodal)
    )
    console.log(this.brandForm.value);
  }

  successResponse(successmodal) {
    this.clear(true, true)
    this.modalService.open(successmodal, { centered: true });
  }

  failedResponse(warningmodal, err) {
    this.clear(true, false)
    if(err.error.message == "Brand already exist"){
      this.errorCaption = err.error.message
      this.errorMessage = "This brand could not be created because, brand already exist with this name. "
    }
    this.modalService.open(warningmodal, { centered: true });
  }

  closeModal(){
    this.errorCaption = " Failed to add brand!"
    this.errorMessage = "There was an error response while trying to add the brand, please try again."
    this.modalService.dismissAll('close modal')
  }

  clear(updateButton : boolean, resetForm : boolean){
    if(updateButton){
      this.loading = false;
      this.buttonText = 'Submit'
    }
    if(resetForm){
      this.brandForm.patchValue({
        brand_name : ''
      })
      this.ngOnInit()
    }
  }

}
