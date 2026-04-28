import { Component, inject } from '@angular/core';
import { CourseService } from './services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private courseService = inject(CourseService);

  courses = toSignal(this.courseService.getCourses(), {
    initialValue: []
  });
}
