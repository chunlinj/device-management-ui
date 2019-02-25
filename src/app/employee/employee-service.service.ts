import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../config';
import {EmployeeType} from './employee.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {

  constructor( private http: HttpClient) { }

  fatchEmployeeList(currtPage: number , size: number) {
    const token = localStorage.getItem('token');
    const getUrl = `${baseUrl}/employees?_page=${currtPage}&_limit=${size}`;
    return this.http.get<EmployeeType[]>(getUrl, {
      observe: 'response',
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    });
  }
  delEmployee(id: number) {
    const token = localStorage.getItem('token');
    const delUrl = `${baseUrl}/employees/${id}`;
    return this.http.delete(delUrl, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    });
  }

  addEmployee(employee: EmployeeType) {
    return this.http.post(`${baseUrl}/employees`, employee);
  }
}
