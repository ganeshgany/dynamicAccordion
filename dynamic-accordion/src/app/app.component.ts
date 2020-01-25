import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "Angular";
  task = {
    taskList: null,
    file: null
  };
  taskListShow = false;
  jsonURL;
  tasks = [
    { task: "task1" },
    { task: "task2" },
    { task: "task3" },
    { task: "task4" }
  ];
  @ViewChild('taskFile') tasksFile: ElementRef;

  constructor(private cs: CommonServiceService) { }

  send() {
    this.task.taskList = '';
    if (this.task.file) {
      this.taskListShow = true;
      this.cs.tasksUpdated.next(this.tasks);
      console.log("task", this.task.taskList);
    } else {
      alert('Select file');
    }
  }

  onFileSelect(event: FileList) {
    this.task.taskList = '';
    this.taskListShow = false;
    const files = event["target"].files;
    const fileExtension = this.task.file.substring(this.task.file.lastIndexOf('.') + 1).toLowerCase();
    if (fileExtension === 'json') {
      if (files.length) {
        const fileReader = new FileReader();
        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = () => {
          const fileData = JSON.parse(<string>fileReader.result)
          this.taskListShow = true;
          this.tasks = fileData;
          this.cs.tasksUpdated.next(this.tasks);
          console.log('file', JSON.parse(<string>fileReader.result));
        };
        fileReader.onerror = (error) => {
          console.log(error);
        };
      }
    } else {
      alert('supports json files');
    }
  }

  sampleTest() {
    this.task.taskList = '';
    this.tasksFile.nativeElement.value = '';
    this.taskListShow = false;
    this.cs.getJSON().subscribe(data => {
      console.log(data);
      this.taskListShow = true;
      this.tasks = data;
      this.cs.tasksUpdated.next(this.tasks);
    });
  }

  transformData() {
    this.task.file = '';
    if (this.task.taskList) {
      try {
        if (JSON.parse(this.task.taskList)) {
          this.tasksFile.nativeElement.value = '';
          this.taskListShow = false;
          this.tasks = JSON.parse(this.task.taskList);
          this.taskListShow = true;
          this.cs.tasksUpdated.next(this.tasks);
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert('enter json');
    }
  }
}
