import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from 'simple-datatables';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';

@Component({
  selector: 'app-view-suppliers',
  templateUrl: './view-suppliers.component.html',
  styleUrls: ['./view-suppliers.component.scss']
})

export class ViewSuppliersComponent implements OnInit, AfterViewInit {

  suppliers;
  updateSupplierForm : FormGroup;
  selectedSupplier;
  buttonText : string = 'Update'
  alert : boolean = false;
  
  constructor(
    private modalService: NgbModal,
    private acs : AccountService,
    private bps : BProductService
  ) { }

  ngOnInit(): void {
    this.getsuppliers()
  }

  ngAfterViewInit(){
    let dataTable1 = new DataTable("#supplierTable", {
      searchable: true,
      fixedHeight: true,
    });
    console.log('After Initialise')
  }

  getsuppliers(){
    this.bps.getAllSuppliers(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        console.log(response)
        this.suppliers = response
      }
    )
  }

  initialiseForm(){
    this.updateSupplierForm = new FormGroup({
      name : new FormControl(this.selectedSupplier.name),
      phone : new FormControl(this.selectedSupplier.phone),
      email : new FormControl(this.selectedSupplier.email),
      address : new FormControl(this.selectedSupplier.address),
      user_id : new FormControl(this.acs.getCurrentUser().id),
      account_id : new FormControl(this.acs.getCurrentUser().account_id) 
    })
  }

  selectSuppliers(supplier, editmodal):void{
    this.selectedSupplier = supplier
    this.initialiseForm()
    this.modalService.open(editmodal, { centered: true });
  } 

  updateSupplier(successmodal){ 
    this.buttonText = "Please wait..."
    this.bps.updateSupplier(this.updateSupplierForm.value, this.selectedSupplier.id).subscribe(
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

  confirmDelete(basicmodal, supplier) {
    this.selectedSupplier = supplier
    this.modalService.open(basicmodal); 
  }

  closeModal(){
    this.modalService.dismissAll('close modal')
    this.alert = false
  }

  deleteSupplier(){
    this.bps.deleteSupplier(this.acs.getCurrentUser().account_id, this.selectedSupplier.id)
    .subscribe(
      (response) =>{
        this.modalService.dismissAll('close modal')
        this.ngOnInit()
      }
    )
  }

}
