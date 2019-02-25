import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {deviceUrl} from '../config';
import {DeviceType} from './device.type';
import {GetTargetVersionType} from './types/getTargetVersion.type';
import {DiveceListType} from './types/diveceList.type';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {

  constructor(private http: HttpClient) { }

  fetchDeviceList() {
    const res = this.http.get<DiveceListType>(`${deviceUrl}/devices`);
    console.log(res)
    return res
  }

  getTargetVersion() {
    return this.http.get<GetTargetVersionType>(`${deviceUrl}/device/target`);
  }

  updateToTargetVersion(params: any) {
    return this.http.post(`${deviceUrl}/device/target`, params);
  }

  resetBox(deviceId: string) {
    return this.http.post(`${deviceUrl}/device/reset/${deviceId}`, '');
  }
}
