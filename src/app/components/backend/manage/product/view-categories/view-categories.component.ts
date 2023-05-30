import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit, AfterViewInit {

  categories;
  updateCategoryForm : FormGroup;
  selectedCategory;
  message;
  buttonText : string = 'Update'
  alert : boolean = false;

  constructor(
    private modalService: NgbModal,
    private acs : AccountService,
    private bps : BProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    let dataTable1 = new DataTable("#categoryTable", {
      searchable: true,
      fixedHeight: true,
    });
  }

  getCategories(){
    this.bps.getAllCategories(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.categories = response
        
      }
    )
  }


  initialiseForm(){
    this.updateCategoryForm = new FormGroup({
      name : new FormControl(this.selectedCategory.name),
      user_id : new FormControl(this.acs.getCurrentUser().id),
      account_id : new FormControl(this.acs.getCurrentUser().account_id) 
    })
  }

  selectCategory(category, editmodal):void{
    this.selectedCategory = category
    this.initialiseForm()
    this.modalService.open(editmodal, { centered: true });
  } 

  updateCategory(successmodal){ 
    this.buttonText = "Please wait..."
    this.bps.updateCategory(this.updateCategoryForm.value, this.selectedCategory.id).subscribe(
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

  confirmDelete(basicmodal, category) {
    this.selectedCategory = category
    this.modalService.open(basicmodal); 
  }

  closeModal(){
    this.modalService.dismissAll('close modal')
    this.alert = false
  }

  deleteCategory(){
    this.bps.deleteCategory(this.acs.getCurrentUser().account_id, this.selectedCategory.id)
    .subscribe(
      (response) =>{
        this.modalService.dismissAll('close modal')
        this.ngOnInit()
      }
    )
  }

}
