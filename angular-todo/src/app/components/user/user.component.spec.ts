import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { CardComponent } from '../shared/card/card.component';
import { DUMMY_USERS } from '../../dunmmy-users';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, CardComponent],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = DUMMY_USERS[0];
    component.selected = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select event on user select', () => {
    spyOn(component.select, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {
      target: { getAttribute: () => component.user.id },
    });
    expect(component.select.emit).toHaveBeenCalledWith(component.user.id);
  });

  it('should set selectedUser on user select', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {
      target: { getAttribute: () => component.user.id },
    });
    expect(component.selectedUser()).toEqual(component.user);
  });

  it('should return correct image path', () => {
    expect(component.imagePath).toBe('users/' + component.user.avatar);
  });
});
