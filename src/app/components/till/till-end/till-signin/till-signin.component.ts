import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/components/backend/account.service';
import { Staff } from 'src/app/components/backend/manage/user/staffs/staff';


@Component({
  selector: 'app-till-signin',
  templateUrl: './till-signin.component.html',
  styleUrls: ['./till-signin.component.scss']
})
export class TillSigninComponent implements OnInit {

  signinForm : FormGroup;
  staffs : Staff[];
  staff : Staff;
  username : string;
  password: string;

  constructor(
    private acs : AccountService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllStaff();
    this.initializeForm();
  }

  initializeForm(){
    this.signinForm = this.fb.group({
      username: this.username,
      password: ['']
    })
  }

  getAllStaff(){
    this.acs.getAllStaff(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.staffs = response
        console.log(this.acs.getCurrentUser().account_id)
      }
    )
  }

  isDeviceAssigned(){
    let device = JSON.parse(localStorage.getItem('device'))
    if(!this.acs.isDeviceAssigned(this.acs.getCurrentUser().account_id, device.code)){
      this.router.navigate(['/devices'])
    }
  }

  selectUser(username : string){
    this.username = username;
    this.initializeForm();
  }

  signIn(){
   this.acs.isStaffCreated(this.signinForm.value).subscribe(
      (response) => {
        if(response == "No Staff"){
          console.log('Invalid Staff Credentials');
        }else{
          this.staff = response;
          localStorage.setItem('staff', JSON.stringify(this.staff));
          console.log(this.staff);
          this.router.navigate(['/till/product-list']);
        }
     })
  }

}
