import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from './../../../interfaces/product';
import { AuthService } from '../../../services/firebase/auth/auth.service';
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
  public data: any;
  public isNew: boolean;
  public keys = [];
  public _ = _;
  newInput;

  constructor(
    private activeModal: NgbActiveModal,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (_.includes(this.collection, 'products')) {
      this.data = _.assign(new Product(), this.data);
    }
    this.keys = _.keys(this.data);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  deleteInput(list: Array<string>, value: string): void {
    _.pull(list, value);
  }

  addInput(key: string, value: string): void {
    this.data[key].push(value);
  }

  isValid(): boolean {
    return _.every(this.keys, (key) => {
      return !_.isEmpty(this.data[key]);
    });
  }

  save(): void {
    if (!this.authService.isAdmin()) { return; }

    if (!this.isNew) {
      this.db
      .collection(this.collection)
      .doc(this.id)
      .update(JSON.parse(JSON.stringify(this.data)))
      .then(() => {
        this.close(`Saved ${this.data.name}`);
      }).catch((error) => {
        this.dismiss(error);
      });
    } else {
      this.db
      .collection(this.collection)
      .add(JSON.parse(JSON.stringify(this.data)))
      .then(() => {
        this.close(`Added ${this.data.name}`);
      }).catch((error) => {
        this.dismiss(error);
      });
    }
  }

  delete(): void {
    if (!this.authService.isAdmin()) { return; }
    this.db
    .collection(this.collection)
    .doc(this.id)
    .delete()
    .then(() => {
      this.close(`Deleted ${this.data.name}`);
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
