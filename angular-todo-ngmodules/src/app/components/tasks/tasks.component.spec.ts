import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { of } from 'rxjs';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let tasksServiceStub: Partial<TasksService>;

  beforeEach(async () => {
    tasksServiceStub = {
      getUserTasks: (userId: string) => [],
      removeTask: (taskId: string) => {},
    };

    await TestBed.configureTestingModule({
      imports: [TasksComponent, TaskComponent, NewTaskComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.userId = '1';
    component.name = 'Test User';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected user tasks', () => {
    spyOn(tasksServiceStub as any, 'getUserTasks').and.callThrough();
    component.selectedUserTasks;
    expect(tasksServiceStub.getUserTasks).toHaveBeenCalledWith('1');
  });

  it('should set isAddingTask to true on start add task', () => {
    component.onStartAddTask();
    expect(component.isAddingTask).toBeTrue();
  });

  it('should set isAddingTask to false on add dialog close', () => {
    component.onAddDialogClose();
    expect(component.isAddingTask).toBeFalse();
  });
});
