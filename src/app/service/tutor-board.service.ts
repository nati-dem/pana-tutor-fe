import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { BoardPostCreateRequest } from ".././../../../pana-tutor-lib/model/tutor/tutor-board.interface";
import {
  TutorGroupCreate,
  GroupMemberRequest,
} from "../../../../pana-tutor-lib/model/tutor/tutor-group.interface";

@Injectable({
  providedIn: "root",
})
export class TutorBoardService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  getGroupsOfUserInCourse(courseId, groupStatus = "active") {
    const url = `${env.findGroupsOfUserInCourse}/?courseId=${courseId}&groupStatus=${groupStatus}`;
    console.log("getGroupsOfUserInCourse url:", url);
    return this.http.get<any>(
      env.userApiBaseUrl + url,
      super.httpOptionsWithAuth()
    );
  }
  upsertGroupPost(boardCreateRequest: BoardPostCreateRequest) {
    const url = `${env.addTutorBoardGroupPost}`;
    return this.http.put<any>(
      env.userApiBaseUrl + url,
      boardCreateRequest,
      super.httpOptionsWithAuth()
    );
  }
  editTutorBoardPost(postId) {
    const url = `${env.addTutorBoardGroupPost}`;
    return this.http.put<any>(
      `${env.userApiBaseUrl}${url}/?postId=${postId}`,
      this.httpOptionsWithAuth
    );
  }

  getTutorBoardPost(groupId, courseId, postStatus) {
    let getTutorBoardurl = env.getTuturBoardPost.replace("<groupId>", groupId);
    const url = `${getTutorBoardurl}/?postStatus=${postStatus}&courseId=${courseId}`;
    console.log(url);

    return this.http.get<any>(
      `${env.userApiBaseUrl}${url}`,
      super.httpOptionsWithAuth()
    );
  }

  removeTutorBoardPost(groupId, postId, courseId) {
    // const url=/tutor-posts/groups/{groupId}/posts/{postId}?courseId=10
    let url = env.removeTutorBoardUrl.replace("<groupId>", groupId);
    url = url.replace("<postId>", postId);
    return this.http.delete<any>(
      `${env.userApiBaseUrl}${url}/?courseId=${courseId}`,
      super.httpOptionsWithAuth()
    );
  }
}
