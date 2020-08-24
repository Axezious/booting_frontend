import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})
export class InsertTicketComponent implements OnInit {
  files: File[] = []

  upload(event) {
    const multiFile = (event.target as HTMLInputElement).files;
    for (let index = 0; index < multiFile.length; index++) {
      this.files.push(multiFile[index]);
    }
  }

  uploadFiles() {
    console.log(this.files);
  }
  public editorContent

  constructor(private elem: ElementRef) { }

  ngOnInit() {
  }

  readQuill() {
    console.log(this.editorContent);
  }
}
