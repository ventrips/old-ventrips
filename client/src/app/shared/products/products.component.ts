import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products = [
    {
      id: 1,
      title: 'Threads',
      category: 'Illustration',
      image: './assets/img/500x500.svg'
    },
    {
      id: 2,
      title: 'Explore',
      category: 'Graphic Design',
      image: './assets/img/500x500.svg'
    },
    {
      id: 3,
      title: 'Finish',
      category: 'Identity',
      image: './assets/img/500x500.svg'
    },
    {
      id: 4,
      title: 'Lines',
      category: 'Branding',
      image: './assets/img/500x500.svg'
    },
    {
      id: 5,
      title: 'Southwest',
      category: 'Website Design',
      image: './assets/img/500x500.svg'
    },
    {
      id: 6,
      title: 'Window',
      category: 'Photography',
      image: './assets/img/500x500.svg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
