import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineModesComponent } from './machine-modes.component';

describe('MachineModesComponent', () => {
  let component: MachineModesComponent;
  let fixture: ComponentFixture<MachineModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineModesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
