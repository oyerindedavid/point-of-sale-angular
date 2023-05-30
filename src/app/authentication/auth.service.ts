import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AccountService } from '../components/backend/account.service';
import { Staff } from '../components/backend/manage/user/staffs/staff';
import { User } from '../components/backend/manage/user/users/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  staff: Staff;
  user: User;
  device;
  is_assigned;

  constructor(
    private acs : AccountService
  ) { }

  get isLoggedIn(): boolean{
    let res: boolean;
    const  user  =  JSON.parse(localStorage.getItem('user'));
    if(user) {
      this.user = user;
      console.log('True: Logged in');
      res = true;
    }else{
      console.log('False: Not logged in');
      res = false;
    }
    return res;
 }

  get isStaffSignedIn(): boolean{
    let res: boolean;
    const  staff  =  JSON.parse(localStorage.getItem('staff'));
    if(staff) {
      this.staff = staff[0];
      console.log('True: Staff Signed in');
      res = true;
    }else{
      console.log('False: Staff Not Signed in');
      res = false;
    }
    return res;
  }

  async isAssigned(){
    const  device  =  JSON.parse(localStorage.getItem('device'));
    return await this.acs.isDeviceAssigned(this.acs.getCurrentUser().account_id, device.code)
    .pipe(
      tap(response => {
          this.is_assigned = response;
          console.log('isAssigned');
          return this.is_assigned;
        }
      )
    ).toPromise()
  }

}
