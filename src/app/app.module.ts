import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NetworkElementStatsComponent } from './admin-home/network-element-stats/network-element-stats.component';
import { ComponentStatsComponent } from './admin-home/component-stats/component-stats.component';
import { IssuesComponent } from './admin-home/issues/issues.component';
import { EmployeeComponent } from './admin-home/employee/employee.component';
import { GroupComponent } from './admin-home/group/group.component';
import { NetworkElementComponent } from './admin-home/network-element/network-element.component';
import { ComponentComponent } from './admin-home/component/component.component';
import { CreateComponent } from './admin-home/employee/create/create.component';
import { UpdateComponent } from './admin-home/employee/update/update.component';
import { SettingsComponent } from './admin-home/settings/settings.component';
import { Form, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    NetworkElementStatsComponent,
    ComponentStatsComponent,
    IssuesComponent,
    EmployeeComponent,
    GroupComponent,
    NetworkElementComponent,
    ComponentComponent,
    CreateComponent,
    UpdateComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
