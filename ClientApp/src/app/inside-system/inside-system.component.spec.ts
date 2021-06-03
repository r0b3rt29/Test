import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideSystemComponent } from './inside-system.component';

describe('InsideSystemComponent', () => {
  let component: InsideSystemComponent;
  let fixture: ComponentFixture<InsideSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
