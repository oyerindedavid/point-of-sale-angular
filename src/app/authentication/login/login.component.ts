import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/components/backend/account.service';
import { User } from 'src/app/components/backend/manage/user/users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public alert : boolean;

  message = null;
  user: User;
  
  constructor(
    private router : Router,
    private fb : FormBuilder,
    private acs: AccountService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get loginFormControl(){
    return this.loginForm.controls;
  }

  login(){
    this.acs.isUserCreated(this.loginForm.value).subscribe(
      (response) => {
        if(response == "No User"){
          this.alert = true;
          console.log('Invalid User Credentials');
        }else{
          this.user = response;
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log(this.user);
          this.router.navigate(['/mg/products']);
        }
     })
  }


}
