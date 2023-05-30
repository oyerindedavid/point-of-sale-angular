import { Component, OnInit } from '@angular/core';
import {SimpleDataTable } from 'src/app/shared/data/tables/data-table';
import * as moment from 'moment';
import { ReportService } from '../report.service';
import { AccountService } from '../../account.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sale-by-product',
  templateUrl: './sale-by-product.component.html',
  styleUrls: ['./sale-by-product.component.scss']
})
export class SaleByProductComponent implements OnInit {

    public simpleData = SimpleDataTable;

    public range : any
    public startDate 
    public endDate
    alwaysShowCalendars: boolean;

	public locationAreas;
	public deviceGroups;
	public deviceList;
	public selectedDevices;
	public selectedLocation;
	public devicesInDeviceGroup
	public staffs;
	public allStaffsId = []
	public selected: any;

	public sales = [];
    public netSaleTotal:    number  = 0;
	public transactionQty  : number = 0
	public totalProductQty : number = 0
	public totalCostPrice  : number = 0
	public totalUnitPrice  : number = 0
	public totalOfMargins  : number = 0
    public totalOfDiscount : number = 0

	public locationAreaId = new FormControl('0')
	public devices = new FormControl('')
	public keyword = new FormControl('')
	public deviceGroupId = new FormControl('')
	public staffId = new FormControl('0')

    public disable: boolean = true;
	
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
		this.alwaysShowCalendars = true; }

	ngOnInit(): void {
		this.getLocationAreas()
        this.getDeviceGroups()
        this.getDevices()
        this.getStaffs()
	}

	runQuery(){
		this.netSaleTotal = 0; 
        this.totalProductQty = 0
		this.totalCostPrice = 0
		this.totalUnitPrice = 0
		this.netSaleTotal = 0
		this.totalOfMargins = 0
		this.totalOfDiscount = 0

		let filter = {
		  dateAction : 'Range',
		  start_date : this.selected.startDate.toDate(),
		  end_date : this.selected.endDate.toDate(),
		  keyword : this.keyword.value,
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

		this.reportService.getSalesByProduct(filter).subscribe(
		  (response) => {
		   this.sales = response
		   response.forEach(res => {
			this.totalProductQty = this.totalProductQty + res.qty
			this.totalCostPrice = this.totalCostPrice + res.cost_price
			this.totalUnitPrice = this.totalUnitPrice + res.selling_price
			this.netSaleTotal = this.netSaleTotal + res.net_sale
			this.totalOfMargins = this.totalOfMargins + res.margin
			this.totalOfDiscount = this.totalOfDiscount + res.discount
		  });
		   
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
	
	  getDevices():void{
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
		  (response) => {
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
