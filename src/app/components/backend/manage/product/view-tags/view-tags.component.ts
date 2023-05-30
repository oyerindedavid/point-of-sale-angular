import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';


@Component({
  selector: 'app-view-tags',
  templateUrl: './view-tags.component.html',
  styleUrls: ['./view-tags.component.scss']
})
export class ViewTagsComponent implements OnInit {

  public tagList;
  public updateTagForm : FormGroup;
  public selectedTag;
  public buttonText : string = 'Update'
  public alert : boolean = false;

  constructor(
    private modalService: NgbModal,
    private acs : AccountService,
    private bps : BProductService
  ) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.bps.getAllTags(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.tagList = response;
      }
    )
  }

  initialiseForm(){
    this.updateTagForm = new FormGroup({
      name : new FormControl(this.selectedTag.name),
      user_id : new FormControl(this.acs.getCurrentUser().id),
      account_id : new FormControl(this.acs.getCurrentUser().account_id) 
    })
  }

  selectTag(tag, editmodal):void{
    this.selectedTag = tag
    this.initialiseForm()
    this.modalService.open(editmodal, { centered: true });
  }

  updateTag(warningmodal, successmodal){
    this.buttonText = "Please wait..."
    this.bps.updateTag(this.updateTagForm.value, this.selectedTag.id).subscribe(
      res => console.log(),
      err => this.failedResponse(),
      () => this.successResponse(successmodal)
    )
  }

  failedResponse(){
    this.alert = true
    this.buttonText = "Update"
  }

  successResponse(successmodal){
    this.modalService.dismissAll('close modal')
    this.buttonText = "Update"
    this.ngOnInit()
  }

  confirmDelete(basicmodal, tag) {
    this.selectedTag = tag
    this.modalService.open(basicmodal); 
  }

  closeModal(){
    this.modalService.dismissAll('close modal')
    this.alert = false
  }

  deleteTag(){
    this.bps.deleteTag(this.acs.getCurrentUser().account_id, this.selectedTag.id)
    .subscribe(
      (response) =>{
        this.modalService.dismissAll('close modal')
        this.ngOnInit()
      }
    )
  }

}
