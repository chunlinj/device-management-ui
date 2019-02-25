import {StatusType} from './status.type';
import {ResponseType} from './response.type';

export interface DeviceType extends  ResponseType{
   deviceId: string;
   deviceName: string;
   online: string;
   lastActiveTime: string;
   swVersion: string;
   cfgVersion: string;
   status: StatusType;
  updateStatus: string;
  disabledUpdate: boolean
  targetNewVersion: string
}
