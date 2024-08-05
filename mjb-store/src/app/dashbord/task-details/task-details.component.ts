
import { Component,EventEmitter, Output, Input } from '@angular/core';
import { Task } from '../../Model/task';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  @Output()
  CloseDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() currentTask: Task | null = null;;

  OnCloseTaskDetail(){
    this.CloseDetailView.emit(false);
  }
}





