import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardsComponent } from './article-cards.component';

describe('ArticleCardsComponent', () => {
  let component: ArticleCardsComponent;
  let fixture: ComponentFixture<ArticleCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
