import {ResponseType} from '../response.type';

export interface  GetTargetVersionType extends ResponseType {
  seVersion: string
  fileUrl: string
}
