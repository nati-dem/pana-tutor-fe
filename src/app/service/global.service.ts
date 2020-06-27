import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  static userId:number;
  static userName:string;
  static userRole:string;
  static courses: UserCourse[];

  constructor() { }

  static resetAll(){
    GlobalService.userId = null;
    GlobalService.userName = null;
    GlobalService.userRole = null;
    GlobalService.courses = [];
  }

}

interface UserCourse {
  course_id:number;
  groups: Groups[];
}

interface Groups {
  groupId?:number;
  user_role:string;
  status:string;
}
