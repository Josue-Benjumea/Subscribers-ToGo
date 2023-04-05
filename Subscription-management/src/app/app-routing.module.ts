import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { CreateSubComponent } from './routes/create-sub/create-sub.component';
import { EditComponent } from './routes/edit/edit.component';

const routes: Routes = [

  {path:'home', component:HomeComponent, pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'nuevo', component:CreateSubComponent, pathMatch:'full'},
  {path:'edit/:id', component:EditComponent, pathMatch:'full'},


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
