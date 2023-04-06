import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApirService } from 'src/app/services/apir.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    public apir: ApirService
  ) {}

  ngOnInit(): void {
    let subID = this.activeRouter.snapshot.paramMap.get('id');
    console.log(subID);
    this.getSub(subID || '');
  }

  getSub(id: string) {
    console.log(id);
    let response = this.apir.getSub(id);
    response.subscribe((res: any) => {
      this.apir.subs = res;
      console.log(res);
    });
  }
}
