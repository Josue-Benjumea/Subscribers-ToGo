import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { CreateSubComponent } from './routes/create-sub/create-sub.component';
import { EditComponent } from './routes/edit/edit.component';
import { AdminGuard } from './guards/admin.guard';
import { DetailsComponent } from './routes/details/details.component';
import { CountriesComponent } from './routes/countries/countries.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'details/:id',
    component: DetailsComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'countries',
    component: CountriesComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'nuevo',
    component: CreateSubComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
