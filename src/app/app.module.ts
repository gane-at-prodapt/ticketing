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
import { CreateNetworkComponent } from './create-network/create-network.component';
import { CreateComponentComponent } from './create-component/create-component.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateComponentComponent } from './update-component/update-component.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { UpdateNetworkComponent } from './update-network/update-network.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsComponent } from './admin-home/settings/settings.component';
import { Form, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';



import { NgChartsModule } from 'ng2-charts';
import { HomepageComponent } from './homepage/homepage.component';
import { MatTableDataSource } from '@angular/material/table'
import {  MatTableModule  } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IncidentComponent } from './incident/incident.component';
import { RaiseticketComponent } from './raiseticket/raiseticket.component';
import { UsersComponent } from './users/users.component';
import { ProblemComponent } from './problem/problem.component';
import { RolesandaccessComponent } from './rolesandaccess/rolesandaccess.component';
import { CreateissueComponent } from './createissue/createissue.component';
import { RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { NetworkHomepageComponent } from './network-homepage/network-homepage.component';
import { IncidentHomepageComponent } from './incident-homepage/incident-homepage.component';
import { GroupHomepageComponent } from './group-homepage/group-homepage.component';
import { UsersHomepageComponent } from './users-homepage/users-homepage.component';
import { IssuesHomepageComponent } from './issues-homepage/issues-homepage.component';
import { RolesHomepageComponent } from './roles-homepage/roles-homepage.component';
import { ResolveTicketComponent } from './resolve-ticket/resolve-ticket.component';








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
    SettingsComponent,
    CreateComponentComponent,
    CreateEmployeeComponent,
    CreateGroupComponent,
    CreateNetworkComponent,
    UpdateComponentComponent,
    UpdateEmployeeComponent,
    UpdateGroupComponent,
    UpdateNetworkComponent,
    HomepageComponent,
    IncidentComponent,
    RaiseticketComponent,
    UsersComponent,
    ProblemComponent,
    RolesandaccessComponent,
    CreateissueComponent,
    AdduserComponent,
    NetworkHomepageComponent,
    IncidentHomepageComponent,
    GroupHomepageComponent,
    UsersHomepageComponent,
    IssuesHomepageComponent,
    RolesHomepageComponent,
    ResolveTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    NgChartsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MatButtonModule
=======
>>>>>>> 47b4bb3610c95cfc0fb53853259294db1bcbaca6
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
