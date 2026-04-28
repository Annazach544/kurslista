import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';

type SortKey = 'code' | 'coursename' | 'progression';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private courseService = inject(CourseService);

  courses = toSignal(this.courseService.getCourses(), {
    initialValue: []
  });

  sortKey = signal<SortKey>('code');
  sortDirection = signal<'asc' | 'desc'>('asc');

  sortedCourses = computed(() => {
    const data = [...this.courses()];

    return data.sort((a, b) => {
      const key = this.sortKey();

      if (a[key] < b[key]) return this.sortDirection() === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return this.sortDirection() === 'asc' ? 1 : -1;
      return 0;
    });
  });

  setSort(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortDirection.set(
        this.sortDirection() === 'asc' ? 'desc' : 'asc'
      );
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
  }
}