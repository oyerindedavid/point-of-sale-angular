import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBrandComponent } from './product/add-brand/add-brand.component';
import { AddCategoryComponent } from './product/add-category/add-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddTagComponent } from './product/add-tag/add-tag.component';
import { UpdateBrandComponent } from './product/update-brand/update-brand.component';
import { UpdateCategoryComponent } from './product/update-category/update-category.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { UpdateTagComponent } from './product/update-tag/update-tag.component';
import { ViewBrandsComponent } from './product/view-brands/view-brands.component';
import { ViewCategoriesComponent } from './product/view-categories/view-categories.component';
import { ViewProductsComponent } from './product/view-products/view-products.component';
import { ViewTagsComponent } from './product/view-tags/view-tags.component';
import { StockTakeComponent } from './stock/stock-take/stock-take.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { ViewSuppliersComponent } from './supplier/view-suppliers/view-suppliers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'products', component: ViewProductsComponent},
      {path: 'update-product/:id', component: UpdateProductComponent},
      {path: 'add-category', component: AddCategoryComponent },
      {path: 'categories', component: ViewCategoriesComponent},
      {path: 'update-category/:id', component: UpdateCategoryComponent},
      {path: 'add-brand', component: AddBrandComponent },
      {path: 'brands', component: ViewBrandsComponent},
      {path: 'update-brand', component: UpdateBrandComponent},
      {path: 'add-tag', component: AddTagComponent },
      {path: 'tags', component: ViewTagsComponent},
      {path: 'update-tag', component: UpdateTagComponent},
      {path: 'add-supplier', component: AddSupplierComponent},
      {path: 'suppliers', component: ViewSuppliersComponent},
      {path: 'update-supplier', component: UpdateSupplierComponent}, 
      {path: 'stock-take', component: StockTakeComponent},       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
