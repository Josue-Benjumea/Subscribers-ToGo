import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'home', component:HomeComponent, pathMatch:'full'}

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
