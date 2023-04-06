import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApirService } from 'src/app/services/apir.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public apir: ApirService) {}
}
