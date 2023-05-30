import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReportService } from '../report.service';
import { AccountService } from '../../account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sale-by-time-interval',
  templateUrl: './sale-by-time-interval.component.html',
  styleUrls: ['./sale-by-time-interval.component.scss']
})

export class SaleByTimeIntervalComponent implements OnInit {

	public showProducts = false;
	public transactionItems : any[];
	public filterDate: any;
	public locationAreas;
	public deviceGroups;
	public deviceList;
	public selectedDevices;
	public selectedLocation;
	public devicesInDeviceGroup
	public staffs;
	public allStaffsId = []
	public selected: any;
	public transactionQty : number = 0
	public totalProductQty : number = 0
	public totalCostPrice : number = 0
	public totalUnitPrice : number = 0
	public netSaleTotal : number = 0
	public totalOfMargins : number = 0
    public totalOfDiscount : number = 0
	
	
	range : any
	public startDate 
    public endDate
	alwaysShowCalendars: boolean;
	public locationAreaId = new FormControl('0')
	public devices = new FormControl('')
	public deviceGroupId = new FormControl('')
	public staffId = new FormControl('0')

	public sales = [];
    public totalResponse: number = 0;

	public disable: boolean = true;
	public disabled: boolean = true;

	ranges: any = {
		'Today': [moment(), moment()],
		'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		'This Month': [moment().startOf('month'), moment().endOf('month')],
		'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	}

	invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

	isInvalidDate = (m: moment.Moment) =>  {
		return this.invalidDates.some(d => d.isSame(m, 'day') )
	}

	rangeClicked(range) {
		this.range = range
		this.selected.startDate = range.dates[0].toDate()
		this.selected.endDate = range.dates[1].toDate()
		this.startDate = range.dates[0].toDate()
		this.endDate = range.dates[1].toDate()
	} 

	constructor(
		private reportService: ReportService,
        private acs: AccountService
	){
		this.alwaysShowCalendars = true;
	}

	ngOnInit(): void {
		this.getSales();
        this.getLocationAreas()
        this.getDeviceGroups()
        this.getDevices()
        this.getStaffs()
		
	}

	initQuery(){
		let filter = {
		  dateAction : 'Range',
		  start_date : moment().subtract(6, 'days').toDate(),
		  end_date : moment().toDate(),
		  location_area_id : 0,
		  devices : this.selectedDevices,
		  device_group_id : '',
		  staff_id : this.allStaffsId,
		  query : 1,
		  account_id : this.acs.getCurrentUser().account_id
		}
	
		console.log(filter)

		this.reportService.getSales(filter).subscribe(
		  (response) => {
		   this.sales = response
		   this.totalResponse = 0;
		   response.forEach(res => {
			 this.totalResponse += res.total;
		   });
		   //If the user change the filter date, any the new query returns empty result
		   if(response.length == 0){
			this.showProducts = false
			this.filterDate = ''
		   }
		   console.log(response)
		  }
		)
	  }
	
	runQuery(){
		let filter = {
		  dateAction : 'Range',
		  start_date : this.selected.startDate.toDate(),
		  end_date : this.selected.endDate.toDate(),
		  location_area_id : this.locationAreaId.value,
		  devices : this.selectedDevices,
		  device_group_id : this.devicesInDeviceGroup,
		  staff_id : this.staffId.value,
		  query : 1,
		  account_id : this.acs.getCurrentUser().account_id
		}
	
		if(this.staffId.value == 0){
			filter.staff_id = this.allStaffsId
		}
		console.log(filter)

		this.reportService.getSales(filter).subscribe(
		  (response) => {
		   this.sales = response
		   this.totalResponse = 0;
		   response.forEach(res => {
			 this.totalResponse += res.total;
		   });
		   //If the user change the filter date, any the new query returns empty result
		   if(response.length == 0){
			this.showProducts = false
			this.filterDate = ''
		   }
		   console.log(response)
		  }
		)
	  }
	
	  getSales(){
		 this.reportService.getSales('').subscribe(
		   (response) => {
			this.sales = response
			response.forEach(res => {
			  this.totalResponse += res.total;
			});
			}
		 )
	  }
	
	  showProductSold(date):void{
		this.showProducts = true;
		this.filterDate = date;

        this.totalProductQty = 0
		this.totalCostPrice = 0
		this.totalUnitPrice = 0
		this.netSaleTotal = 0
		this.totalOfMargins = 0
		this.totalOfDiscount = 0

		this.reportService.getProductSaleByTime(date).subscribe(
		  (response) => {
			  this.transactionItems = response
			  this.transactionItems.forEach((transactionItem)=>{
				  this.totalProductQty = this.totalProductQty + transactionItem.qty
				  this.totalCostPrice = this.totalCostPrice + transactionItem.cost_price
				  this.totalUnitPrice = this.totalUnitPrice + transactionItem.selling_price
				  this.netSaleTotal = this.netSaleTotal + transactionItem.net_sale
				  this.totalOfMargins = this.totalOfMargins + transactionItem.margin
				  this.totalOfDiscount = this.totalOfDiscount + transactionItem.discount
			  } )
			  console.log(response)
			}
		)
	  }
	
	  getLocationAreas():void{
		this.acs.getLocationArea(this.acs.getCurrentUser().account_id).subscribe(
		  response => this.locationAreas = response
		)
	  }
	
	  getDeviceGroups(): void{
		this.acs.getDeviceGroups(this.acs.getCurrentUser().account_id).subscribe(
		  response => this.deviceGroups = response
		)
	  }
	
	  getDevices(){
		this.acs.getDevices(this.acs.getCurrentUser().account_id).subscribe(
		  (response) => {
			this.deviceList = response
			this.selectedDevices = response
		}
		)
	  }
	
	  getDevicesByLocation():void{
		let location_area_id = this.locationAreaId.value;
		this.acs.getDevicesByLocation(this.acs.getCurrentUser().account_id,location_area_id).subscribe(
		  (response) => {
			this.deviceList = response
			this.selectedDevices = response
		  }
		)
	  }
	
	  getDevicesByGroup():void{
		let device_id = this.devicesInDeviceGroup;
		console.log(this.devicesInDeviceGroup)
		this.acs.getDevicesByDeviceId(this.acs.getCurrentUser().account_id,device_id).subscribe(
		  (response
			) => {
			this.deviceList = response
			this.selectedDevices = response
		  }
		)
	  }
	
	  getStaffs():void{
		this.acs.getAllStaff(this.acs.getCurrentUser().account_id).subscribe(
		  (response) => {
			this.staffs = response;
			response.forEach(element =>{
			  this.allStaffsId.push(element.id)
			})
		  }
		)
	  }
  



}
