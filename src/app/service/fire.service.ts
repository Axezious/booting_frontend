import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Thread } from '../model/thread';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  task: AngularFireUploadTask;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  insertFireHdr(t: Thread, files: File[]) {
    const idHdr: string = uuid();
    this.db.list(`threads/${t.id}/`).set(idHdr, t);
    this.startUpload(files, t.id, idHdr);
  }

  insertFireDtl(t: Thread, files: File[]) {
    const idDtl: string = uuid();
    this.db.list(`threads/${t.id}/`).set(idDtl, t);
    this.startUpload(files, t.id, idDtl);
  }

  startUpload(files: File[], nomorTicket: string, id: string) {

    for (let index = 0; index < files.length; index++) {
      let file = files[index];
      // The storage path
      // const idFile: string = uuid();
      const path = `booting/${nomorTicket}/${id}/${file.name}`;

      // Reference to storage bucket
      const ref = this.storage.ref(path);

      // The main task
      this.task = this.storage.upload(path, file);

      // Progress monitoring
      // this.percentage = this.task.percentageChanges();

      this.task.snapshotChanges().pipe(
        // The file's download URL
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            console.log(url);

            // Insert to realtime after upload files.
            this.db.list(`threads/${nomorTicket}/${id}/urlFiles`).push(url);
          });
        }),
      ).subscribe();
    }

  }

}
