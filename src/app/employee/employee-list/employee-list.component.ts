import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../employee-service.service';
import {EmployeeType} from '../employee.type';
import {HttpResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  constructor(private employeeService: EmployeeServiceService , private message: NzMessageService) { }
  dataSet: EmployeeType[] = [];
  currtPage: number = 1;
  size = 5;
  total  = 10;
  isLoading: boolean;
  isVisible = false;

  fatchEmployeeList() {
    this.isLoading = true;
    this.employeeService.fatchEmployeeList(this.currtPage, this.size).subscribe((res: HttpResponse<EmployeeType[]> ) => {
      // console.log(res);
      // 总条数
      this.total = +res.headers.get('X-Total-Count');
      this.dataSet = res.body;
      this.isLoading = false;
  });
  }

  ngOnInit(): void {
    this.fatchEmployeeList();
  }

  trackByEmpId(index: number , employee: EmployeeType) {
    return employee.id;
  }

  confirmDel(id: number) {
  this.employeeService.delEmployee(id).subscribe( res => {
    // this.fatchEmployeeList();
     this.dataSet = this.dataSet.filter( data => data.id !== id);
  });
  }

  cancelDel() {
    this.message.info('已取消删除此员');
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }



}
