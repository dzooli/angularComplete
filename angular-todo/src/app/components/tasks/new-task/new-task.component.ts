import {
  Component,
  EventEmitter,
  Inject,
  Output,
  Input,
  signal,
  inject,
} from '@angular/core';
import { FormsModule, RequiredValidator } from '@angular/forms';
import { type NewTask } from '../../../models/new-task.interface';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId: string = '';
  @Output() close = new EventEmitter<void>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  private tasksService = inject(TasksService);

  onCancel(event: Event) {
    this.close.emit();
  }

  onSubmitTask(event: Event) {
    let newTask: NewTask = {
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate,
    };
    this.tasksService.addTask(newTask, this.userId);
    this.close.emit();
  }
}
