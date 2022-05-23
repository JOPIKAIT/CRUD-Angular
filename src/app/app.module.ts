import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddEditUserComponent } from './components/add-edituser/add-edituser.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrosComponent } from './components/erros/erros.component';
import { ExcellService } from "./services/excell.service";

@NgModule({
  declarations: [
    AppComponent,
    AddEditUserComponent,
    DetailsUserComponent,
    ListUserComponent,
    ErrosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ExcellService],
  bootstrap: [AppComponent]
})
export class AppModule { }
