import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineImageComponent } from './machine-image.component';

describe('MachineImageComponent', () => {
  let component: MachineImageComponent;
  let fixture: ComponentFixture<MachineImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
