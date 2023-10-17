import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';



export interface Role {
  id: number;
  name: string;
  createdOn:number;
}

export interface Module{
  id: number;
  role: Role;
  module: Module;
  status: string;
  modifiedOn: number;
}


export interface Access{
  role:Role;
  module:Module;
  status:String;
  modifiedOn:number;
}

export interface User {
  id: number;
  name: string;
  email:string;
  role:Role;
  createdOn:number;
}

export interface Auth{
  id:number;
  user:User;
  authToken:string;
  modifiedOn:number;
}

export interface NetworkElement{
  id: number;
  name: string;
  deviceFamily:string;
  ipv4Address:string;
  macAddress:string;
  modifiedOn:number;
}

export interface Issue{
  id: number;
  name: string;
  network_family: string;
  description: string;
  modifiedOn: string;
}

export interface AssignmentGroup{
  id:number;
  name:string;
  description:string;
  issue: Issue;
  createdOn: number;
}

export interface Groupmembers{
  id:number;
  group: AssignmentGroup;
  groupMember: User;
  modifiedOn: number;
}

export interface Incident{
  id?: number;
  name?: string;
  networkElement?: NetworkElement;
  issue?: Issue;
  severity?: number;
  priority?: number;
  resolution_comment?: string;
  state?: string;
  assignmentGroup?: AssignmentGroup;
  assignedTo?: User;
  raisedBy?: User;
  modifiedOn?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseurl="http://localhost:8088/api/v1/";
  private accessurl=this.baseurl+"access";
  private assignmentrgroupurl = this.baseurl+"assignmentgroup";
  private authurl = this.baseurl+"auth";
  private groupmembersurl = this.baseurl+"groupmembers";
  private incidenturl = this.baseurl+"incident";
  private issueurl = this.baseurl+"issue";
  private moduleurl = this.baseurl+"module";
  private networkelementurl = this.baseurl+"networkelement";
  private roleurl = this.baseurl+"role";
  private userurl = this.baseurl+"users";


  constructor(private httpClient: HttpClient) {
  }

  //access
  addAccess(A:Access):Observable<Access>{
    return this.httpClient.post<Access>(this.accessurl,A);
  }

  getAccessByRole(id:number):Observable<Access[]>{
    return this.httpClient.get<Access[]>(this.accessurl+"/role/"+id);
  }

  deleteAccess(A:Access):Observable<String>{
    return this.httpClient.delete<String>(this.accessurl,{body: A});
  }

  //Assignmentgroup
  addAssignmentGroup(A:AssignmentGroup):Observable<AssignmentGroup>{
    return this.httpClient.post<AssignmentGroup>(this.assignmentrgroupurl,A);
  }

  getAssignmentGroupsByIssue(id:number):Observable<AssignmentGroup[]>{
    return this.httpClient.get<AssignmentGroup[]>(this.assignmentrgroupurl+"/issue/"+id);
  }
  
  getAssignmentGroups():Observable<AssignmentGroup[]>{
    return this.httpClient.get<AssignmentGroup[]>(this.assignmentrgroupurl+"/all");
  }
  deleteAssignmentGroups(A:AssignmentGroup):Observable<String>{
    return this.httpClient.delete<String>(this.assignmentrgroupurl,{body: A});
  }

  //Auth

  login(data:string):Observable<Auth>{
    return this.httpClient.post<Auth>(this.authurl+"/login",data);
  }
  addAuth(A:Auth):Observable<Auth>{
    return this.httpClient.post<Auth>(this.authurl,A);
  }
  putAuth(A:Auth):Observable<Auth>{
    return this.httpClient.put<Auth>(this.authurl,A);
  }
  deleteAuth(A:Auth):Observable<Auth>{
    return this.httpClient.delete<Auth>(this.authurl,{body:A});
  }

  //groupmembers

  addGroupMembers(G:Groupmembers):Observable<Groupmembers>{
    return this.httpClient.post<Groupmembers>(this.groupmembersurl,G);
  }

  //TODO: add groupmembers in bulk

  getMembersByGroup(id:number):Observable<Groupmembers[]>{
    return this.httpClient.get<Groupmembers[]>(this.groupmembersurl+"/group/"+id);
  }
  
  getGroupsByMember(id:number):Observable<Groupmembers[]>{
    return this.httpClient.get<Groupmembers[]>(this.groupmembersurl+"/member/"+id);
  }
  deleteGroupMember(G:Groupmembers):Observable<String>{
    return this.httpClient.delete<String>(this.groupmembersurl,{body: G});
  }

  //incident
  addIncident(I:Incident):Observable<Incident>{
    return this.httpClient.post<Incident>(this.incidenturl,I);
  }
  putIncident(I:Incident):Observable<Incident>{
    return this.httpClient.put<Incident>(this.incidenturl,I);
  }
  deleteIncident(I:Incident):Observable<Incident>{
    return this.httpClient.delete<Incident>(this.incidenturl,{body:I});
  }
  getIncidents():Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(this.incidenturl+"/all");
  }
  getIncidentsByGroup(id:number):Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(this.incidenturl+"/group/"+id);
  }
  getIncidentsByMember(id:number):Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(this.incidenturl+"/member/"+id);
  }
  
  getIncidentsByMemberGroups(id:number):Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(this.incidenturl+"/member/groups/"+id);
  }

  getIncidentsByIssue(id:number):Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(this.incidenturl+"/issue/"+id);
  }

  //Issue
  addIssue(I:Issue):Observable<Issue>{
    return this.httpClient.post<Issue>(this.issueurl,I);
  }
  putIssue(I:Issue):Observable<Issue>{
    return this.httpClient.put<Issue>(this.issueurl,I);
  }
  deleteIssue(I:Issue):Observable<Issue>{
    return this.httpClient.delete<Issue>(this.issueurl,{body:I});
  }
  getIssues():Observable<Issue[]>{
    return this.httpClient.get<Issue[]>(this.issueurl);
  }
  getIssuesByNetworkDevice(name:string):Observable<Issue[]>{
    return this.httpClient.get<Issue[]>(this.issueurl+"/network/"+name);
  }

  //module 

  addModule(M:Module):Observable<Module>{
    return this.httpClient.post<Module>(this.moduleurl,M);
  }
  putModule(M:Module):Observable<Module>{
    return this.httpClient.put<Module>(this.moduleurl,M);
  }
  deleteModule(M:Module):Observable<Module>{
    return this.httpClient.delete<Module>(this.moduleurl,{body:M});
  }
  getModules():Observable<Module[]>{
    return this.httpClient.get<Module[]>(this.moduleurl+"/all");
  }

  //networkelement
  addNetworkElement(N:NetworkElement):Observable<NetworkElement>{
    return this.httpClient.post<NetworkElement>(this.networkelementurl,N);
  }
  getNetworkElements():Observable<NetworkElement[]>{
    return this.httpClient.get<NetworkElement[]>(this.networkelementurl);
  }
  getNetworkElementsByFamily(family:string):Observable<NetworkElement[]>{
    return this.httpClient.get<NetworkElement[]>(this.networkelementurl+"/"+family);
  }

  //Role

  addRole(R:Role):Observable<Role>{
    return this.httpClient.post<Role>(this.roleurl,R);
  }
  putRole(R:Role):Observable<Role>{
    return this.httpClient.put<Role>(this.roleurl,R);
  }
  getRoles():Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.roleurl);
  }


  //User
  addUser(U:User):Observable<User>{
    return this.httpClient.post<User>(this.userurl,U);
  }
  putUser(U:User):Observable<User>{
    return this.httpClient.put<User>(this.userurl,U);
  }
  deleteUser(U:User):Observable<string>{
    return this.httpClient.delete<string>(this.userurl,{body:U});
  }
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.userurl+"/all");
  }
  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(this.userurl+"/"+id);
  }
  getUserByRole(id:number):Observable<User[]>{
    return this.httpClient.get<User[]>(this.userurl+"/role/"+id);
  }

}
