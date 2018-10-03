import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  public items: Observable<any[]>;

  constructor(db: AngularFirestore) {
      this.items = db.collection('/items').valueChanges();
  }

  ngOnInit(): void {
  }

}
