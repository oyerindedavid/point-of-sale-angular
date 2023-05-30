import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

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

  tagForm = new FormGroup({
    tag_name: new FormControl(''),
    is_deleted : new FormControl(0),
    account_id : new FormControl(this.acs.getCurrentUser().account_id),
    user_id : new FormControl(this.acs.getCurrentUser().id)
  })

  addTag(successmodal, warningmodal): void{
    this.loading = true;
    this.buttonText = 'Please wait...'
    this.bps.addTag(this.tagForm.value).subscribe(
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
    if(err.error.message == "Tag already exist"){
      this.errorCaption = err.error.message
      this.errorMessage = "This tag could not be created because, tag already exist with this name. "
    }
    this.modalService.open(warningmodal, { centered: true });
  }

  closeModal(){
    this.errorCaption = " Failed to add tag!"
    this.errorMessage = "There was an error response while trying to add the tag, please try again."
    this.modalService.dismissAll('close modal')
  }

  clear(updateButton : boolean, resetForm : boolean){
    if(updateButton){
      this.loading = false;
      this.buttonText = 'Submit'
    }
    if(resetForm){
      this.tagForm.patchValue({
        tag_name : ''
      })
      this.ngOnInit()
    }
  }


}
