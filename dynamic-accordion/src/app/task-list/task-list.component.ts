import { Component, OnInit, Input } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private cs: CommonServiceService) { }
  @Input() taskList;
  panelOpenState = false;
  public itemsList: Object[] = [
  ];

  ngOnInit() {
    console.log('task comp', this.taskList);
    this.itemsList = this.taskList;
    this.cs.tasksUpdated.subscribe((data) => {
      this.itemsList = data as Array<object>;
    });
  }
}
