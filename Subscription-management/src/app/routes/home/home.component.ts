import { Component,OnInit } from '@angular/core';
import { ApirService } from 'src/app/services/apir.service';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(public apir:ApirService){}
ngOnInit(): void {
  this.getSubs();
}

getSubs() {
  let response = this.apir.getSubscribers();
  
  response.subscribe((res: any) => {
    this.apir.subs = res.data;
    console.log(this.apir.subs);
    
  });
}




}
