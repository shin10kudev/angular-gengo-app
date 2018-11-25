import { Component, OnInit } from "@angular/core";
import { PostService } from "../shared/post.service";
import { Post } from "../shared/post";
import * as _ from "lodash";

@Component({
  selector: "post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();
  selectedFiles: FileList;
  currentPost;

  // Misc.
  translate: boolean = false;
  showModal: boolean = false;

  constructor(private postSvc: PostService) {}

  ngOnInit() {}

  toggleTranslate() {
    this.translate = !this.translate;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  createPost() {
    let postHasImage = this.selectedFiles;
    this.currentPost = this.post;

    if (postHasImage) {
      let file = this.selectedFiles.item(0);
      this.post.file = file;
      this.postSvc.pushUpload(this.post);
    } else {
      this.postSvc.createPost(this.post);
    }

    this.toggleModal();
    this.post = new Post();
  }
}
