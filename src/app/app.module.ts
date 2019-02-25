import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DeviceManageComponent} from './device-manage/device-manage.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule,
  MatTableModule, MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatExpansionModule,
  MatDialogModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatFormFieldModule, MatTooltipModule, MatStepperModule, MatAutocompleteModule, MatToolbar
} from '@angular/material';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DeviceManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule,
    MatTableModule, MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatExpansionModule,
    MatDialogModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatFormFieldModule, MatTooltipModule, MatStepperModule, MatAutocompleteModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
    // { provide: HTTP_INTERCEPTORS, useValue: AuthInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
