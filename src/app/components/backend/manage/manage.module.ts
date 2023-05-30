import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'angular-archwizard';
import { ColorPickerModule } from 'ngx-color-picker';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ViewProductsComponent } from './product/view-products/view-products.component';
import { AddTagComponent } from './product/add-tag/add-tag.component';
import { ViewTagsComponent } from './product/view-tags/view-tags.component';
import { AddBrandComponent } from './product/add-brand/add-brand.component';
import { ViewBrandsComponent } from './product/view-brands/view-brands.component';
import { AddCategoryComponent } from './product/add-category/add-category.component';
import { ViewCategoriesComponent } from './product/view-categories/view-categories.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { UpdateCategoryComponent } from './product/update-category/update-category.component';
import { UpdateBrandComponent } from './product/update-brand/update-brand.component';
import { UpdateTagComponent } from './product/update-tag/update-tag.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StockTakeComponent } from './stock/stock-take/stock-take.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { UsersComponent } from './user/users/users.component';
import { AddStaffComponent } from './user/add-staff/add-staff.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { StaffsComponent } from './user/staffs/staffs.component';
import { AdvancedUiModule } from '../../advanced-ui/advanced-ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DragulaModule } from 'ng2-dragula';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { ViewSuppliersComponent } from './supplier/view-suppliers/view-suppliers.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };


@NgModule({
  declarations: [
    AddProductComponent,
    ViewProductsComponent,
    AddTagComponent,
    ViewTagsComponent,
    AddBrandComponent,
    ViewBrandsComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    UpdateBrandComponent,
    UpdateTagComponent,
    StockTakeComponent,
    AddCustomerComponent,
    CustomersComponent,
    UsersComponent,
    AddStaffComponent,
    AddUserComponent,
    StaffsComponent,
    AddSupplierComponent,
    ViewSuppliersComponent,
    UpdateSupplierComponent
    
  ],
  imports: [
    CommonModule, ManageRoutingModule,FormsModule,
    NgxDatatableModule,ReactiveFormsModule,RouterModule,NgbModule,NgSelectModule,
    AngularMultiSelectModule,CKEditorModule,AngularEditorModule,
    HttpClientModule,QuillModule.forRoot(),NgxIntlTelInputModule,
    NgxDaterangepickerMd.forRoot(),DropzoneModule,NgxDropzoneModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000
      }
    ),
    ArchwizardModule,ColorPickerModule,DpDatePickerModule,
    NgxSliderModule, NgSelectModule, DpDatePickerModule, DragulaModule.forRoot(), 
    SweetAlert2Module, FormsModule, ReactiveFormsModule, CarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageModule { }
