import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesHomepageComponent } from './issues-homepage.component';

describe('IssuesHomepageComponent', () => {
  let component: IssuesHomepageComponent;
  let fixture: ComponentFixture<IssuesHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesHomepageComponent]
    });
    fixture = TestBed.createComponent(IssuesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
