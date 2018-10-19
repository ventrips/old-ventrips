import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  public title: string;
  public ref: string;
  public data: Object;
  public keys = [];
  public _ = _;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.keys = _.keys(this.data);
    _.pull(this.keys, 'id');
  }

  close(reason?: any): void {
    this.activeModal.close(reason);
  }

  dismiss(reason?: string): void {
    this.activeModal.dismiss(reason);
  }

}
