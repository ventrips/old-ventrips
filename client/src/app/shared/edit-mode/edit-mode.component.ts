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

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public authService: AuthService

  ) {}

  ngOnInit(): void {}

  openEditModal() {
    if (!this.authService.isAuthenticated()) { return; }

    const modalRef = this.modalService.open(
      EditModalComponent,
      { size: 'lg', centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.collection = this.collection;
    modalRef.componentInstance.title = this.data.name;
    // Make Copy of Data and Remove ID
    const dataCopy = _.omit(_.cloneDeep(this.data), ['id']);
    modalRef.componentInstance.data = dataCopy;


    modalRef.result.then((result?) => {
      this.toastr.success(`Saved!`, result);
    }, (reason?) => {
      this.toastr.info(`Edit Canceled!`, reason);
    });
  }
}
