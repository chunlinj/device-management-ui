import {Component, OnInit} from '@angular/core';
import {DeviceServiceService} from './device-service.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DeviceType} from './device.type';
import {GetTargetVersionType} from './types/getTargetVersion.type';
import {DiveceListType} from './types/diveceList.type';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.css']
})
export class DeviceManageComponent implements OnInit {
  constructor(private deviceService: DeviceServiceService, private message: NzMessageService, private fb: FormBuilder) {}
  validateLogForm: FormGroup;
  controlArray = [];
  isCollapse = true;
  isVisibleModelLog = false;
  isVisibleTargetVerionModelLog = false;

  dataSet: DeviceType[];
  updateStatus: string
  targetNewVersion: string
  fileUrl: string
  siemensLogo: string
  targetVersionId: string
  dataSetVersion = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      checked : false
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      checked : false
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      checked : true
    }
  ];

  /*********************** 目标版本列表
   ************************************/
  checkbox = true;



  /**
   * 初始化列表数据
   */
  initList() {
    this.deviceService.getTargetVersion().subscribe((res: GetTargetVersionType ) => {
      this.targetNewVersion = res.seVersion;
      this.fileUrl = res.fileUrl;
    })
    this.deviceService.fetchDeviceList().subscribe( (res: DiveceListType) => {
      const keys: DeviceType[] = res.devices;
      for (let i = 0 ; i < keys.length ; i++) {
        keys[i].online = keys[i].online === '0' ? 'Online' : 'Offline'
        keys[i].updateStatus = keys[i].status.swUpdate === '0' ? 'update' : 'updating'
        keys[i].disabledUpdate = keys[i].status.swUpdate === '0' ? true : false
        keys[i].targetNewVersion = this.targetNewVersion
      }
        // Object.keys(keys).forEach(key => {
        //   key.online = key.online === '0' ? 'Online' : 'Offline'
        // })
      this.dataSet = keys;
      },
      error1 => {
        this.message.create('warning', '服务器好像出错了~ 请稍候再试');
      }
    )
  }


  /**
   * 重置盒子
   */
  resetConfirm(deviceId: string) {
    // this.dataSet = this.dataSet.filter( data => data.id !== id);
    console.log(deviceId);
    this.deviceService.resetBox(deviceId).subscribe( res => {
      this.message.info('reseted');
    },
      error1 => {
        this.message.create('warning', '服务器好像出错了~ 请稍候再试');
      }
      )
  }

  /**
   * 校验 log 查询 条件
   */
  validateLogFormFun() {
    this.validateLogForm = this.fb.group({
      joinDateStart: ['', this.joinDateValidate],
      joinDateEnd: ['', this.joinDateValidate]
    })
  }
  ngOnInit() {
    this.initList()
    this.validateLogFormFun()
  }

  /**
   *  跟新到目标版本
   */
  confirmUpdating(deviceId: string): void {
    this.dataSet.filter( data => {
      if (data.deviceId === deviceId) {
        data.disabledUpdate = false
        data.updateStatus = 'updating'
      }
    })
    const params = {fileUrl: this.fileUrl, seVersion: this.targetNewVersion}
    this.deviceService.updateToTargetVersion(params).subscribe( res => {
        this.dataSet.filter( data => {
          if (data.deviceId === deviceId) {
            data.disabledUpdate = true
            data.updateStatus = 'update'
          }
        })
    },
      error1 => {
        this.message.create('warning', '服务器好像出错了~ 请稍候再试');
      }
      );
    this.message.info('Updating');
  }

  showModal(): void {
    this.isVisibleModelLog = true;
  }

  /**
   * 打开目标版本列表
   * @param {string} deviceId
   */
  showModalVersion(deviceId: string): void {
    this.targetVersionId = deviceId
    this.isVisibleTargetVerionModelLog = true;
  }

  handleOkModalTargetVersion(): void {
    this.isVisibleTargetVerionModelLog = false;
  }
  handleOkModalTargetVersin(): void {
    console.log('Button ok clicked!');
    const value = this.dataSetVersion.filter( data => data.checked === true)[0];
    this.dataSet.filter(set => {
      if (set.deviceId === this.targetVersionId) {
        set.targetNewVersion = value.name
      }
    })
    this.isVisibleTargetVerionModelLog = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleModelLog = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModelLog = false;
  }
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? (index < 6) : true;
    });
  }

  resetForm(): void {
    this.validateLogForm.reset();
  }

  /**
   *  将选择框设置为单选
   * @param {string} key
   */
  refreshStatus(key: string): void {
    this.dataSetVersion.filter( value => {
      if (value.key === key ) {
        value.checked = true;
      } else {
        value.checked = false;
      }
    })
  }

  /**
   * 日期的自定义校验规则
    */
  joinDateValidate(control: FormControl) {
    const selectDate = +control.value
    // console.log(selectDate)
    const curDate = +new Date()

    if (selectDate > curDate) {
      return { date: true };
    }

    return null;
  }

}
