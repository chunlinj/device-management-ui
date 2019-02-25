import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HomeServiceService} from './home-service.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {

  constructor(private homeService: HomeServiceService, private router: Router,
              private message: NzMessageService) { }

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout(e) {
    e.preventDefault();
    this.homeService.logout().subscribe(res => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },
     error1 => {
       this.message.create('warning', '好像出错了~ 请稍候再试');
     }
      );

  }

}
