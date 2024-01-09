import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePayFineComponent } from './generate-pay-fine.component';

describe('GeneratePayFineComponent', () => {
  let component: GeneratePayFineComponent;
  let fixture: ComponentFixture<GeneratePayFineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePayFineComponent]
    });
    fixture = TestBed.createComponent(GeneratePayFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
