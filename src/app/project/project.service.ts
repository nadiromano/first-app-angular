import { Injectable } from '@angular/core';
import { Project } from '@app/models/Project';
import { LogService } from '@app/shared/log.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpCLient: HttpClient, private logService: LogService) {}

  getAll(): Observable<Project[]> {
    return this.httpCLient
      .get<Project[]>('http://localhost:3000/projects')
      .pipe(tap((data) => this.logService.log(`get all eseguito ${data}`)));
  }

  add(project: Project): Observable<Project> {
    const projectToAdd = {
      ...project,
      code: Math.random().toString(36).replace('0.', '').substring(2, 9),
      done: false,
      tasks: [],
    };
    return this.httpCLient
      .post<Project>('http://localhost:3000/projects', projectToAdd)
      .pipe(tap((data) => this.logService.log(`add eseguito ${data}`)));
  }

  get(id: number): Observable<Project> {
    return this.httpCLient
      .get<Project>(`http://localhost:3000/projects/${id}`)
      .pipe(tap((data) => this.logService.log(`get eseguito ${data}`)));
  }
}
