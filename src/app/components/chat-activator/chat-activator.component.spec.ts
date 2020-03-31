import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatActivatorComponent } from './chat-activator.component';

describe('ChatActivatorComponent', () => {
  let component: ChatActivatorComponent;
  let fixture: ComponentFixture<ChatActivatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatActivatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatActivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
