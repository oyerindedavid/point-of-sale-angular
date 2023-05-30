import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/components/backend/account.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss']
})
export class SelectLocationComponent implements OnInit {

  locationareas;
  constructor(
    private acs : AccountService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getLocationAreas()
  }

  getLocationAreas(){
    this.acs.getLocationArea(this.acs.getCurrentUser().account_id).subscribe(
      (response) => {
        this.locationareas = response
        console.log(response)
      }
    )
  }

  selectLocationArea(locationArea){
    
  }

}
