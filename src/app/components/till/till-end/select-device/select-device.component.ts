import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/components/backend/account.service';


@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.scss']
})
export class SelectDeviceComponent implements OnInit {

  devices;
  constructor(
    private acs : AccountService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllDevices()
    const  device  =  JSON.parse(localStorage.getItem('device'));
    console.log(device)
  }

  getAllDevices(){
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.acs.getDevicesByLocation(this.acs.getCurrentUser().account_id, id).subscribe(
      response => this.devices = response
    )
  }

  selectDevice(device){
    device.code = this.randomInteger(100000, 1000000000)
    //Action to perform, check if device is assigned
    //if not assigned, onclick, change is assigned to assigned
    if(device.is_assigned == 0){
      let data = {
        account_id : this.acs.getCurrentUser().account_id,
        device_id : device.id,
        device_code : device.code,
        is_assigned : 1
      }
      this.acs.updateDevice(data).subscribe(
        (response) => {
          console.log(response)
          this.router.navigate(['/till-end/signin'])
        }
      )
      device.is_assigned = 1
      localStorage.setItem('device', JSON.stringify(device));
    }else{
      console.log('Device Already Assigned')
    } 
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
