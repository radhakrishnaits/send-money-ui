import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieverComponent } from './reciever.component';

describe('RecieverComponent', () => {
  let component: RecieverComponent;
  let fixture: ComponentFixture<RecieverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
