import { Component, OnInit, Input } from '@angular/core';
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
  entryComponents: [ EditModalComponent ]
})
export class EditModeComponent implements OnInit {
  @Input() ref: string;
  @Input() data: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public authService: AuthService

  ) {}

  ngOnInit(): void {}

  openEditModal() {
    const modalRef = this.modalService.open(
      EditModalComponent,
      { size: 'lg', centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.title = this.data.name;
    modalRef.componentInstance.ref = this.ref;
    modalRef.componentInstance.data = _.cloneDeep(this.data);

    modalRef.result.then((result?) => {
      this.toastr.success('Saved!');
    }, (reason?) => {
      this.toastr.info('Edit Canceled!');
    });
  }
}
