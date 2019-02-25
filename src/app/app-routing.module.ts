import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {DeviceManageComponent} from './device-manage/device-manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'device', component: DeviceManageComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [ {
      path: 'employee',
      loadChildren: './employee/employee.module#EmployeeModule'
    }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
