import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  public id: string;
  public collection: string;
  public title: string;
  public data: Object;
  public keys = [];
  public _ = _;

  constructor(
    private activeModal: NgbActiveModal,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.keys = _.keys(this.data);
  }

  save(reason?: any): void {
    this.db
    .collection(this.collection)
    .doc(this.id)
    .update(this.data)
    .then((result) => {
      this.close(reason);
    }).catch((error) => {
      this.dismiss(error);
    });
  }

  close(reason?: any): void {
    this.activeModal.close(reason);
  }

  dismiss(reason?: string): void {
    this.activeModal.dismiss(reason);
  }

}
