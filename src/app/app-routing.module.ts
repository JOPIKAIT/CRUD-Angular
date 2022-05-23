import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddEditUserComponent } from './components/add-edituser/add-edituser.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';

const routes: Routes = [
  { path: '', component: ListUserComponent},
  { path: 'usuarios', component: ListUserComponent},
  { path: 'add', component: AddEditUserComponent},
  { path: 'edit/:id', component: AddEditUserComponent},
  { path: 'delete/:id', component: ListUserComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
