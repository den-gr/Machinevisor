import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinePeriodComponent } from './machine-period.component';

describe('MachinePeriodComponent', () => {
  let component: MachinePeriodComponent;
  let fixture: ComponentFixture<MachinePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
