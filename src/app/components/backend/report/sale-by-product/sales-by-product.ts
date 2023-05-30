export interface SalesByProduct {
    id: number,
    customer_id: number,
    staff_id: number,
    is_completed: boolean,
    discount_id: number,
    discount_type: number,
    discount_worth: number,
    total: number,
    basket_items: TransactionItems[]

}

interface TransactionItems{
    id: number,
    product_id: number,
    quantity: number,
    discount_id: number,
    discount_worth: number,
    discount_type: number,
    note: string,
    date_created: string,
    basket_id: number,
    product_name: string,
    selling_price: number
}