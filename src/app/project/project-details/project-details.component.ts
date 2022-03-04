import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from '@app/models/Project';
import { Observable, switchMap } from 'rxjs';
import { ProjectService } from '../project.service';

@Component({
  selector: 'ngprj-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project$!: Observable<Project>;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.projectService.get(+id!).subscribe((data) => {
    //   console.log(data);
    // });
    this.project$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectService.get(+params.get('id')!)
      )
    );
  }
}
