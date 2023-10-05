import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNetworkComponent } from './create-network.component';

describe('CreateNetworkComponent', () => {
  let component: CreateNetworkComponent;
  let fixture: ComponentFixture<CreateNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNetworkComponent]
    });
    fixture = TestBed.createComponent(CreateNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
