import { Product } from "src/app/components/backend/manage/product/product";

export interface SellingItem{
   total: number,
   qty: number,
   note: string,
   discount_id: number, 
   discount_type: number,
   discount_worth: number,
   product : Product,
   date: string
}