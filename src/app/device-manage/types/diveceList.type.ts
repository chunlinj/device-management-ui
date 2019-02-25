import {ResponseType} from '../response.type';
import {DeviceType} from '../device.type';

export interface DiveceListType extends ResponseType {
  devices: DeviceType[]
}
