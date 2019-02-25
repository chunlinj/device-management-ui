import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginForm} from './LoginForm.type';
import {baseUrl} from '../config';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {
   return this.http.post(`${baseUrl}/tokens`, loginForm);
  }
}
