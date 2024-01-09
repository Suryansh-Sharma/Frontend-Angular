import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFinePageComponent } from './all-fine-page.component';

describe('AllFinePageComponent', () => {
  let component: AllFinePageComponent;
  let fixture: ComponentFixture<AllFinePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFinePageComponent]
    });
    fixture = TestBed.createComponent(AllFinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
