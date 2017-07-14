import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from './upload';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;
  userId: string;

  getUploads(query={}) {
    if (!this.userId) return;
    this.uploads = this.db.list(`${this.basePath}/${this.userId}`, {
      query: query
    });
    return this.uploads
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    let date = Date.now()
    const uploadName = date + upload.file.name
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${uploadName}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = uploadName
        this.saveFileData(upload)
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    let date = new Date();
    upload.timeStamp = date;
    this.db.list(`${this.basePath}/${this.userId}`).push(upload);
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/${this.userId}`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
