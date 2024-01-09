import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFullDetailComponent } from './item-full-detail.component';

describe('ItemFullDetailComponent', () => {
  let component: ItemFullDetailComponent;
  let fixture: ComponentFixture<ItemFullDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemFullDetailComponent]
    });
    fixture = TestBed.createComponent(ItemFullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
