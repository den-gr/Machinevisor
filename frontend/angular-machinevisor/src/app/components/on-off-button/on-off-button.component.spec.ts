import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnOffButtonComponent } from './on-off-button.component';

describe('OnOffButtonComponent', () => {
  let component: OnOffButtonComponent;
  let fixture: ComponentFixture<OnOffButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnOffButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnOffButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
