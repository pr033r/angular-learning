import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTestsComponent } from './angular-tests.component';

describe('AngularTestsComponent', () => {
  let component: AngularTestsComponent;
  let fixture: ComponentFixture<AngularTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
