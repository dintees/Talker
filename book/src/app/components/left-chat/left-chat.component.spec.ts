import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftChatComponent } from './left-chat.component';

describe('LeftChatComponent', () => {
  let component: LeftChatComponent;
  let fixture: ComponentFixture<LeftChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
