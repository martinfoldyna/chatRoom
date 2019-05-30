import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListDialogComponent } from './friends-list-dialog.component';

describe('FriendsListDialogComponent', () => {
  let component: FriendsListDialogComponent;
  let fixture: ComponentFixture<FriendsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
