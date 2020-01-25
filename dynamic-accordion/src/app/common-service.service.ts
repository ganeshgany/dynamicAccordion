import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  tasksUpdated = new Subject();
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/a.json");
  }
}
