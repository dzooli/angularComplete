import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let tasksServiceStub: Partial<TasksService>;

  beforeEach(async () => {
    tasksServiceStub = {
      addTask: (task: any, userId: string) => {
        return task;
      },
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, NewTaskComponent],
      declarations: [],
      providers: [{ provide: TasksService, useValue: tasksServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    component.userId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event on cancel', () => {
    spyOn(component.close, 'emit');
    const button = fixture.debugElement.query(By.css('button.cancel'));
    button.triggerEventHandler('click', null);
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call addTask and emit close event on submit', () => {
    spyOn(tasksServiceStub as any, 'addTask');
    spyOn(component.close, 'emit');

    component.enteredTitle = 'Test Task';
    component.enteredSummary = 'Test Summary';
    component.enteredDate = '2023-10-10';

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(tasksServiceStub.addTask).toHaveBeenCalledWith(
      {
        title: 'Test Task',
        summary: 'Test Summary',
        date: '2023-10-10',
      },
      '1'
    );
    expect(component.close.emit).toHaveBeenCalled();
  });
});
