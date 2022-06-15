import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMenuComponent } from './machine-menu.component';

describe('MachineMenuComponent', () => {
  let component: MachineMenuComponent;
  let fixture: ComponentFixture<MachineMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
