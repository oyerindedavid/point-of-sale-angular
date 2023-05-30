import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  supplierForm: FormGroup;

  public loading : boolean;
  public buttonText : string = 'Submit'
  public errorCaption : string = " Failed to add supplier!"
  public errorMessage : string = "There was an error response while trying to add the supplier, please try again."

  constructor(
    private modalService: NgbModal,
    private bps : BProductService,
    private fb: FormBuilder,
    private acs : AccountService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    this.supplierForm = this.fb.group({
      supplier_name : [''],
      phone : [''],
      address : [''],
      email : [''],
      account_id : this.acs.getCurrentUser().account_id,
      user_id : this.acs.getCurrentUser().id,
      is_deleted : 0
    })
  }

  addSupplier(successmodal, warningmodal): void{
    this.loading = true;
    this.buttonText = 'Please wait...'
    this.bps.addSupplier(this.supplierForm.value).subscribe(
      res => console.log(),
      err => this.failedResponse(warningmodal, err),
      () => this.successResponse(successmodal)
    ); 
  }

  successResponse(successmodal) {
    this.clear(true, true)
    this.modalService.open(successmodal, { centered: true });
  }

  failedResponse(warningmodal, err) {
    this.clear(true, false)
    if(err.error.message == "Supplier already exist"){
      this.errorCaption = err.error.message
      this.errorMessage = "This Supplier could not be created because, tag already exist with this name. "
    }
    this.modalService.open(warningmodal, { centered: true });
  }

  closeModal(){
    this.errorCaption = " Failed to add supplier!"
    this.errorMessage = "There was an error response while trying to add the supplier, please try again."
    this.modalService.dismissAll('close modal')
  }

  clear(updateButton : boolean, resetForm : boolean){
    if(updateButton){
      this.loading = false;
      this.buttonText = 'Submit'
    }
    if(resetForm){
      this.supplierForm.patchValue({
        supplier_name : '',
        phone : '',
        address : '',
        email : '',
      })
      this.ngOnInit()
    }
  }

}
