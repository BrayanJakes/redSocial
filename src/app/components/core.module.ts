import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
import { CoreComponent } from './core/core.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CoreComponent,
    ProfileComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ShareModule
  ]
})
export class CoreModule { }
