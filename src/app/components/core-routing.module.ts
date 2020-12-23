import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreComponent } from './core/core.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: 'home', component: CoreComponent, canActivate: [LoginGuard] ,children: [
    {path: '', component: HomeComponent},
    {path: 'profile', component: ProfileComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
