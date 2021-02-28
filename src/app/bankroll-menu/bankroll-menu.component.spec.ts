import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrollMenuComponent } from './bankroll-menu.component';

describe('BankrollMenuComponent', () => {
  let component: BankrollMenuComponent;
  let fixture: ComponentFixture<BankrollMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankrollMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankrollMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
