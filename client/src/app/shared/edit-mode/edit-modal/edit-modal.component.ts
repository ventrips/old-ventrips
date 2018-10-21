import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from './../../../interfaces/product';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
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
    private modalService: NgbModal,
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

  deleteInput(key: string, index: string): void {
    const list = this.data[key];
    const value = this.data[key][index];

    if (!this.authService.isAdmin()) { return; }
    const modalRef = this.modalService.open(
      ConfirmModalComponent,
      { size: 'sm', centered: true, backdrop: 'static' }
    );
    modalRef.componentInstance.title = `Delete ${_.upperCase(key)}: ${_.upperCase(value)}`;
    modalRef.componentInstance.text = `Are you sure you want to delete ${_.upperCase(value)} from ${_.upperCase(key)}?`;
    modalRef.result.then((result?) => {
      _.pull(list, value);
    }, (reason?) => {});
  }

  addInput(key: string, value: string): void {
    if (!this.authService.isAdmin()) { return; }

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

    const modalRef = this.modalService.open(
      ConfirmModalComponent,
      { size: 'sm', centered: true, backdrop: 'static' }
    );
    modalRef.componentInstance.title = `Delete ${this.data.name}`;
    modalRef.componentInstance.text = `Are you sure you want to delete ${this.data.name}?`;
    modalRef.result.then((result?) => {
      this.db
      .collection(this.collection)
      .doc(this.id)
      .delete()
      .then(() => {
        this.close(`Deleted ${this.data.name}`);
      }).catch((error) => {
        this.dismiss(error);
      });
    }, (reason?) => {});
  }

  close(reason?: any): void {
    this.activeModal.close(reason);
  }

  dismiss(reason?: string): void {
    this.activeModal.dismiss(reason);
  }

}
