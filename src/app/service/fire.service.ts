import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Thread } from '../model/thread';
import { v4 as uuid } from 'uuid';
import { Callbacks } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  task: AngularFireUploadTask;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  insertFireHdr(t: Thread, files: File[]) {
    const idHdr: string = t.id + ' - 1';

    // this.db.list(`threads/${t.id}/`).set(idHdr, t);
    this.db.list(`threads/${t.id}/`).set(idHdr, t);
    this.startUpload(files, t.id, idHdr);
  }

  insertFireDtl(t: Thread, files: File[]) {
    this.getSizeTicket('slmb-541', {
      onFinished: (data) => {
        const idDtl: string = `${t.id} - ${data + 1}`;
    
        this.db.list(`threads/${t.id}/`).set(idDtl, t);
        this.startUpload(files, t.id, idDtl);
        
      }
    });
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
            // this.db.list(`threads/${nomorTicket}/${id}/urlFiles`).push(url);
            this.db.list(`threads/${nomorTicket}/${id}/urlFiles`).push(url);
          });
        }),
      ).subscribe();
    }
  }

  getSizeTicket(noTiket: string, call: Callback) {
    this.db.list(`threads/${noTiket}/`).query.once('value', data => {
      console.log(data.numChildren())
      call.onFinished(data.numChildren());
        
        // child.length)
        
        // hasChild.length);
    })
    
    // , ref => ref.once('value', data => {
    //   data.
    // }))
    
    // .query.once('value', data => {
    //   console.log(data);
      
    // }).then(dataa => {
    //   console.log(dataa);
      
    // })
    // valueChanges().subscribe(data => {
      // console.log(data.length);
      // 
      
    // });
  }

  getRealtimeChat(nomorTiket: string, call: Callback) {
    this.db.list(`threads/${nomorTiket}/`).valueChanges().subscribe(data => {
      console.log(data);
      
    });
  }
}

interface Callback {
  onFinished(param:any);

}
