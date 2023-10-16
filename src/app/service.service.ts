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
  authToken:String;
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
  assignmentGroup: AssignmentGroup;
  GroupMember: User;
  modifiedOn: number;
}

export interface Incident{
  id: number;
  name: string;
  networkElement: NetworkElement;
  issue: Issue;
  severity: number;
  priority: number;
  resolution_comment : string;
  state: string;
  assignmentGroup: AssignmentGroup;
  assignedTo: User;
  raisedBy: User;
  modifiedOn: number;
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
  private userurl = this.baseurl+"user";


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
  
  getAssignmentGroups(id:number):Observable<AssignmentGroup[]>{
    return this.httpClient.get<AssignmentGroup[]>(this.assignmentrgroupurl+"/all");
  }
  deleteAssignmentGroups(A:AssignmentGroup):Observable<String>{
    return this.httpClient.delete<String>(this.assignmentrgroupurl,{body: A});
  }

  //Auth

  login(data:JSON){
    return this.httpClient.post<Auth>(this.authurl,JSON.stringify(data));
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

  getMembersByGroup(id:number):Observable<Groupmembers[]>{
    return this.httpClient.get<Groupmembers[]>(this.groupmembersurl+"/group/"+id);
  }
  
  getGroupsByMember(id:number):Observable<Groupmembers[]>{
    return this.httpClient.get<Groupmembers[]>(this.groupmembersurl+"/member/"+id);
  }
  deleteGroupMember(G:Groupmembers):Observable<String>{
    return this.httpClient.delete<String>(this.groupmembersurl,{body: G});
  }
  



  //user
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.userurl+"/all");
  }





}
