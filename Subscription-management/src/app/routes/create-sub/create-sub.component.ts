import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { subsI } from 'src/app/models/subs/subs.module';
import { ApirService } from 'src/app/services/apir.service';
import { ResponseI } from 'src/app/models/response/response.module';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.css']
})
export class CreateSubComponent {


  newSub = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    CountryCode: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Area: new FormControl(''),
    JobTitle: new FormControl(''),
    Topics: new FormControl([]),
  });
  constructor( public apir:ApirService,  public router:Router){}
  postForm(form:any){
    console.log(form)
   this.apir.createSub(form).subscribe(data =>{
    console.log(data)
   })
  }
}
