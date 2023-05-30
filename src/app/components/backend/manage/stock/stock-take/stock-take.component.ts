import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleDataTable } from 'src/app/shared/data/tables/data-table';
import { AccountService } from '../../../account.service';
import { BProductService } from '../../../b-product.service';
import { Moment } from 'moment'
import { Product } from '../../product/product';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})
export class StockTakeComponent implements OnInit {

  review
  selectedProduct : String
  isProductExist : boolean
  products: Product[];
  locationAreas
  stockArray

  reasons = [
    {
      id : 1,
      name : 'Stock Stake'
    },
    {
      id : 2, 
      name : 'Expiry Date'
    }
  ]

  keyword = new FormControl('')

  constructor(
    private bps : BProductService,
    private fb : FormBuilder,
    private acs : AccountService
  ) { }

  ngOnInit(): void{
    this.getLocationAreas()
    this.bps.stockArrayObs.subscribe(
      response => this.stockArray = response
    )
    this.bps.reviewObs.subscribe(
      response => this.review = response
    )
  }
  
  stockForm : FormGroup = this.fb.group({
    reasonId : [''],
    locationAreaId : [''],
    accountId : this.acs.getCurrentUser().account_id,
    userId : this.acs.getCurrentUser().id,
    stocks : this.fb.array([
      
    ])
  })
      
  getProducts(): void{
    this.bps.getAllProducts()
      .subscribe(products => this.products = products);
  }

  getLocationAreas():void{
    this.acs.getLocationArea(this.acs.getCurrentUser().account_id).subscribe(
      response => this.locationAreas = response
    )
  }

  searchProduct(event){
    const keyword = event.target.value;
    this.bps.getSearchedProduct(keyword)
    .subscribe(
      (products) => {
          products.length > 0 ? this.isProductExist = true : this.isProductExist = false
          this.products = products;
        }
      )
  }

  async selectProduct(product: Product){
    this.selectedProduct = product.name 
    this.isProductExist = false
    let category = await this.getCategory(product.category_id)
    let supplier = await this.getSupplier(product.supplier_id)
    let brand = await this.getBrand(product.brand_id)
    let stock = await this.getStockInfo(product.id)
    
    const stockUpdate = this.fb.group({
      productId : product.id,
      name : product.name,
      category  : category[0].name,
      barcode   : product.barcode,
      supplier  : supplier[0].name,
      brand     : brand[0].name,
      currentStock : 2,
      newStock : ['']
    })
    this.stocks.push(stockUpdate);
    
    //Add to stock array and send to stream
    this.stockArray.push(stockUpdate.value)
    this.bps.stockArraySource.next(this.stockArray)
    console.log(this.stockArray)
  }

  get stocks(){
     return this.stockForm.get('stocks') as FormArray;
  }

  removeStock(stockId: number){
    this.stocks.removeAt(stockId)

    //Remove from stockArray and send to stream
    this.stockArray.splice(stockId, 1);
    this.bps.stockArraySource.next(this.stockArray)
  }

  async getCategory(id: number){
    let category_name : string;
    return await this.bps.getCategoryById(id).pipe(
      tap(response => {
          category_name = response[0].name;
          return category_name;
        }
      )
    ).toPromise()
  }
 
  //Update stock newStock
  updateArrayStock(index){
    this.stockArray[index].newStock = this.stocks.value[index].newStock
    this.bps.stockArraySource.next(this.stockArray)
  }

  async getStockInfo(product_id){
    var queryData = {
      product_id : product_id,
      account_id : this.acs.getCurrentUser().account_id,
      location_area_id : this.stockForm.value.locationAreaId
    }
    console.log(queryData)
    return await this.bps.getStockInfo(queryData).pipe(
       tap(response => {
          return response
       })
    ).toPromise()
  }

  async getSupplier(id: number){
    let supplier_name : string;
    return await this.bps.getSupplierById(id).pipe(
      tap(response => {
          supplier_name = response[0].name;
          return supplier_name;
        }
      )
    ).toPromise()
  }

  async getBrand(id: number){
    let brand_name : string;
    return await this.bps.getBrandById(id).pipe(
      tap(response => {
          brand_name = response[0].name;
          return brand_name;
        }
      )
    ).toPromise()
  }

  setNewStockAsCurretStock(index){
    let stock = this.stocks.controls[index];
    stock.patchValue({
      newStock: stock.value.currentStock,
    });
  }

  reviewStock():void{
    this.bps.stockArraySource.next(this.stockArray)
    this.bps.reviewSource.next(true)
  }

  saveStock(){
    let stockInfo = this.stockForm.value
    console.log(stockInfo)
    this.bps.saveStock(stockInfo).subscribe(
      (response) => console.log(response)
    )
  }

}
