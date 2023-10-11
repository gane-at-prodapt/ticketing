import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new ErrorStateMatcher();


  networkElements:string[]=["Router", "OLT","ONT"];


}
