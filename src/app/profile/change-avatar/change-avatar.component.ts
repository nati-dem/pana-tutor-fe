import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { UserSignupRequest } from "../../../../../pana-tutor-lib/model/user/user-auth.interface";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { environment as env } from "./../../../environments/environment";

@Component({
  selector: "app-change-avatar",
  templateUrl: "./change-avatar.component.html",
  styleUrls: ["./change-avatar.component.css"],
})
export class ChangeAvatarComponent implements OnInit { //  extends BaseFormGroup 

  @Input() profileInp: UserSignupRequest;
  profile: UserSignupRequest;
  id: any;
  currentUser:any;
  avatarsLocation = `${env.uploadBaseLocation}${env.avatarsLocation}`;

  constructor(private authService: AuthService,
    private userService: UserService, private toastr: ToastrService) {
  }

  public uploader: FileUploader = new FileUploader({
    url: `${env.userApiBaseUrl}${env.avatarUploadUrl}`,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'avatar',
    allowedFileType: ['image'],
    headers: [{name : 'Authorization', value: 'Bearer ' + this.authService.getLocalToken() } ]
  });

  ngOnInit(): void {
    this.profile = this.profileInp;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any) => {
      //console.log('Uploaded File Details:', item);
      response  = JSON.parse(response);
      console.log('Uploaded File response:', response);
      this.profile.avatar = response.filename;
      this.toastr.success('File successfully uploaded!');
    };
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log('onFileSelected', file);
  }

}
