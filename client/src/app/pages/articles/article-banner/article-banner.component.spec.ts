import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBannerComponent } from './article-banner.component';

describe('ArticleBannerComponent', () => {
  let component: ArticleBannerComponent;
  let fixture: ComponentFixture<ArticleBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
