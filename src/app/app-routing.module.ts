import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateNetworkComponent } from './create-network/create-network.component';
import { CreateComponentComponent } from './create-component/create-component.component';
import { IssuesComponent } from './admin-home/issues/issues.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateNetworkComponent } from './update-network/update-network.component';
import { UpdateComponentComponent } from './update-component/update-component.component';
import { IncidentComponent } from './incident/incident.component';
import { RaiseticketComponent } from './raiseticket/raiseticket.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UsersComponent } from './users/users.component';
import { ProblemComponent } from './problem/problem.component';
import { RolesandaccessComponent } from './rolesandaccess/rolesandaccess.component';
import { CreateissueComponent } from './createissue/createissue.component';
import { AdduserComponent } from './adduser/adduser.component';
import { NetworkHomepageComponent } from './network-homepage/network-homepage.component';
import { IncidentHomepageComponent } from './incident-homepage/incident-homepage.component';
import { GroupHomepageComponent } from './group-homepage/group-homepage.component';
import { IssuesHomepageComponent } from './issues-homepage/issues-homepage.component';
import { UsersHomepageComponent } from './users-homepage/users-homepage.component';
import { RolesHomepageComponent } from './roles-homepage/roles-homepage.component';
import { ResolveTicketComponent } from './resolve-ticket/resolve-ticket.component';

const routes: Routes = [
  { path: 'home', component: AdminHomeComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'network', component: CreateNetworkComponent },
  { path: 'component', component: CreateComponentComponent },
  { path: 'incident', component: IncidentComponent },
  { path: 'group', component: CreateGroupComponent },
  { path: 'addnetwork', component: UpdateNetworkComponent },
  { path: 'addcomponent', component: UpdateComponentComponent },
  { path: 'ticket', component: RaiseticketComponent },
  { path: 'addgroup', component: UpdateGroupComponent },
  { path: 'users', component: UsersComponent},
  { path: 'issues', component: ProblemComponent},
  { path: 'access', component: RolesandaccessComponent },
  { path: 'adminhome', component: AdminHomeComponent},
  { path: 'addissue', component: CreateissueComponent},
  { path: 'login', component: AdminLoginComponent},
  { path: 'adduser', component:AdduserComponent },
  { path: 'roles', component:RolesandaccessComponent },
  { path: 'networkHome', component: NetworkHomepageComponent },
  { path: 'incidentHome', component: IncidentHomepageComponent},
  { path: 'groupHome', component: GroupHomepageComponent },
  { path: 'issueHome', component: IssuesHomepageComponent },
  { path: 'userHome', component: UsersHomepageComponent },
  { path: 'roleHome', component: RolesHomepageComponent},
  { path: 'resolve', component: ResolveTicketComponent }


  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
