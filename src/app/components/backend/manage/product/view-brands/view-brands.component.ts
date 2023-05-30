import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';

@Component({
  selector: 'app-view-brands',
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.scss']
})

export class ViewBrandsComponent implements OnInit {

  brands;
  updatebrandForm : FormGroup;
  selectedbrand;
  message;
  buttonText : string = 'Update'
  alert : boolean = false;

  constructor(
    private modalService: NgbModal,
    private acs : AccountService,
    private bps : BProductService
  ) { }

  ngOnInit(): void {
    this.getbrands();
  }

  getbrands(){
    this.bps.getAllBrand(this.acs.getCurrentUser().account_id).subscribe(
      response => this.brands = response
    )
  }

  initialiseForm(){
    this.updatebrandForm = new FormGroup({
      name : new FormControl(this.selectedbrand.name),
      user_id : new FormControl(this.acs.getCurrentUser().id),
      account_id : new FormControl(this.acs.getCurrentUser().account_id) 
    })
  }

  selectbrand(brand, editmodal):void{
    this.selectedbrand = brand
    this.initialiseForm()
    this.modalService.open(editmodal, { centered: true });
  } 

  updatebrand(warningmodal, successmodal){ 
    this.buttonText = "Please wait..."
    this.bps.updateBrand(this.updatebrandForm.value, this.selectedbrand.id).subscribe(
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

  confirmDelete(basicmodal, brand) {
    this.selectedbrand = brand
    this.modalService.open(basicmodal); 
  }

  closeModal(){
    this.modalService.dismissAll('close modal')
    this.alert = false
  }

  deletebrand(){
    this.bps.deleteBrand(this.acs.getCurrentUser().account_id, this.selectedbrand.id)
    .subscribe(
      (response) =>{
        this.modalService.dismissAll('close modal')
        this.ngOnInit()
      }
    )
  }
}
