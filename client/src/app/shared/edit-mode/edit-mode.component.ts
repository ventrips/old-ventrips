import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AuthService } from '../../services/firebase/auth/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [ EditModalComponent ]
})
export class EditModeComponent implements OnInit {
  @Input() id: string;
  @Input() collection: string;
  @Input() title: string;
  @Input() data: any;
  @Input() isNew: boolean;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  openEditModal() {
    if (!this.authService.isAdmin()) { return; }

    const modalRef = this.modalService.open(
      EditModalComponent,
      { size: 'lg', centered: true, backdrop: 'static' }
    );

    if (!this.isNew) {
      modalRef.componentInstance.id = this.id;
      modalRef.componentInstance.title = this.title;
    } else {
      modalRef.componentInstance.title = 'Create New Product';
      modalRef.componentInstance.isNew = this.isNew;
    }

    modalRef.componentInstance.collection = this.collection;
    // Make Copy of Data and Remove ID
    const dataCopy = _.omit(_.cloneDeep(this.data), ['id']);
    modalRef.componentInstance.data = dataCopy;


    modalRef.result.then((result?) => {
      this.toastr.success(result, `Success!`);
    }, (reason?) => {
      this.toastr.info(reason, `Dismissed`);
    });
  }
}
