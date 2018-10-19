import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  @Input() ref: string;
  @Input() data: any;
  public _ = _;
  public isEdit = false;
  public tempData: any;

  public keys = [];

  constructor() {}

  ngOnInit(): void {
    this.tempData = _.cloneDeep(this.data);
    this.keys = _.keys(this.tempData);
  }

  showEdit(): void {
    this.isEdit = true;
  }

  hideEdit(): void {
    this.tempData = _.cloneDeep(this.data);
    this.isEdit = false;
  }

}
