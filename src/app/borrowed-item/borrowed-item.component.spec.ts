import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedItemComponent } from './borrowed-item.component';

describe('BorrowedItemComponent', () => {
  let component: BorrowedItemComponent;
  let fixture: ComponentFixture<BorrowedItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowedItemComponent]
    });
    fixture = TestBed.createComponent(BorrowedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
