import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public loading : boolean;
  public buttonText : string = 'Submit'
  public errorCaption : string = " Failed to add category!"
  public errorMessage : string = "There was an error response while trying to add the category, please try again."

  constructor(
    private modalService: NgbModal,
    private bps : BProductService,
    private acs : AccountService
  ) { }

  ngOnInit(): void {
  }

  categoryForm = new FormGroup({
    category_name : new FormControl(''),
    is_deleted : new FormControl(0),
    account_id : new FormControl(this.acs.getCurrentUser().account_id),
    user_id : new FormControl(this.acs.getCurrentUser().id)
  })

  addCategory(successmodal, warningmodal):void {
    this.loading = true;
    this.buttonText = 'Please wait...'
    this.bps.addCategory(this.categoryForm.value).subscribe(
      res => console.log(),
      err => this.failedResponse(warningmodal, err),
      () => this.successResponse(successmodal)
    )
  }

  successResponse(successmodal) {
    this.clear(true, true)
    this.modalService.open(successmodal, { centered: true });
  }

  failedResponse(warningmodal, err) {
    this.clear(true, false)
    if(err.error.message == "Category already exist"){
      this.errorCaption = err.error.message
      this.errorMessage = "This category could not be created because, category already exist with this name. "
    }
    this.modalService.open(warningmodal, { centered: true });
  }

  closeModal(){
    this.errorCaption = " Failed to add category!"
    this.errorMessage = "There was an error response while trying to add the category, please try again."
    this.modalService.dismissAll('close modal')
  }

  clear(updateButton : boolean, resetForm : boolean){
    if(updateButton){
      this.loading = false;
      this.buttonText = 'Submit'
    }
    if(resetForm){
      this.categoryForm.patchValue({
        category_name : ''
      })
      this.ngOnInit()
    }
  }

}
