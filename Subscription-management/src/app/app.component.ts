import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { ApirService } from './services/apir.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwtDecode from "jwt-decode"
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'y';
  constructor(){} 

}
