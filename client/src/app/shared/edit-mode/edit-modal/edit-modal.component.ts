import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from './../../../interfaces/product';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import * as _ from 'lodash';
import { ProductsService } from '../../../services/firebase/products/products.service';

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
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.data = _.assign(new Product(), this.data);
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
      { size: 'lg', centered: true, backdrop: 'static' }
    );
    modalRef.componentInstance.title = `Delete ${_.toUpper(key)}: ${_.toUpper(value)}`;
    modalRef.componentInstance.text = `Are you sure you want to delete ${_.toUpper(value)}?`;
    modalRef.result.then((result?) => {
      _.pull(list, value);
    }, (reason?) => {});
  }

  addInput(key: string, value: string): void {
    if (!this.authService.isAdmin()) { return; }
    if (_.isNil(value) || _.isEmpty(value)) { return; }
    this.data[key].push(value);
  }

  getInputType(key: string): string {
    let value;
    switch (_.toLower(key)) {
      case 'url':
        value = 'url';
        break;
      case 'text':
        value = 'text';
        break;
    }
    return value;
  }

  // Ignores default
  isDefault(key: string): boolean {
    return _.includes(['created', 'uid', 'displayName'], key);
  }

  isValid(): boolean {
    return _.every(this.keys, (key) => {
      if (this.isDefault(key)) { return true; }
      return !_.isEmpty(this.data[key]);
    });
  }

  save(): void {
    if (!this.authService.isAdmin()) { return; }

    if (!this.isNew) {
      this.productsService.updateDocument(this.collection, this.id, this.data)
      .then(() => {
        this.close(`Saved ${this.data.name}`);
      }).catch((error) => {
        this.dismiss(error);
      });
    } else {
      this.productsService.createDocument(this.collection, this.data)
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
      { size: 'lg', centered: true, backdrop: 'static' }
    );
    modalRef.componentInstance.title = `Delete ${_.toUpper(this.collection)}: ${_.toUpper(this.data.name)}`;
    modalRef.componentInstance.text = `Are you sure you want to delete ${_.toUpper(this.data.name)}`;
    modalRef.result.then((result?) => {
      this.productsService.deleteDocument(this.collection, this.id)
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
