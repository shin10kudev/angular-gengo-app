import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  upload: Upload = new Upload();
  isTranslate: boolean = false;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.upload.file = file
    this.upSvc.pushUpload(this.upload)
    this.upload = new Upload();
  }
}
