import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAndReturnComponent } from './issue-and-return.component';

describe('BorrowAndReturnComponent', () => {
  let component: IssueAndReturnComponent;
  let fixture: ComponentFixture<IssueAndReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueAndReturnComponent]
    });
    fixture = TestBed.createComponent(IssueAndReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
