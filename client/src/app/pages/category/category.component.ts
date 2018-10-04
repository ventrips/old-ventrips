import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public _ = _;
  public category: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.category = this.activatedRoute.snapshot.params['category'];
  }

  ngOnInit(): void {
  }

}
