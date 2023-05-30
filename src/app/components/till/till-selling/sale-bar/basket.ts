import { Customer } from '../../../backend/manage/customer/customer';
import { Staff } from '../../../backend/manage/user/staffs/staff';
import { SellingItem } from './selling-item';

export interface Basket{
    staff: Staff,
    customer: Customer,
    is_completed : number,
    basketTotal: number,
    discount_id: number,
    discount_type: number,
    discount_worth: number,
    date: string,
    device_id : number,
    account_id : number,
    basketItems: SellingItem[]
}