// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroup from '../../../app/model/group';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof ExportGroup>;
    User: ReturnType<typeof ExportUser>;
  }
}
