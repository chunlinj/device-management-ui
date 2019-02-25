import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../config';
import {HttpHeaders} from '@angular/common/http/src/headers';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private router: Router, private http: HttpClient) { }

  logout() {
    const token = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/tokens`
    // {headers: {Authorization: `Bearer ${token}`}}
    );
  }
}
