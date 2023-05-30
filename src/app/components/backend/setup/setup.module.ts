import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { AddModuleToAccountComponent } from './add-module-to-account/add-module-to-account.component';
import { ViewModulesComponent } from './view-modules/view-modules.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { CreateDeviceGroupComponent } from './create-device-group/create-device-group.component';
import { CreateLocationAreaComponent } from './create-location-area/create-location-area.component';
import { DeviceGroupsComponent } from './device-groups/device-groups.component';
import { DevicesComponent } from './devices/devices.component';
import { LocationAreasComponent } from './location-areas/location-areas.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleUserComponent } from './module-user/module-user.component';
import { SelectModuleComponent } from './select-module/select-module.component';
import { UpdateModuleComponent } from './update-module/update-module.component';


@NgModule({
  declarations: [
    CreateAccountComponent,
    ViewAccountComponent,
    AddModuleComponent,
    AddModuleToAccountComponent,
    ViewModulesComponent,
    CreateDeviceComponent,
    CreateDeviceGroupComponent,
    CreateLocationAreaComponent,
    DeviceGroupsComponent,
    DevicesComponent,
    LocationAreasComponent,
    ModuleListComponent,
    ModuleUserComponent,
    SelectModuleComponent,
    UpdateModuleComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
