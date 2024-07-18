import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

interface WorkoutSummary {
  name: string;
  value: number;
}

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss']
})
export class WorkoutChartComponent implements OnChanges {
  @Input() workouts: Workout[] = [];
  @Input() workoutSummary: WorkoutSummary[] = [];
  @Input() selectedUser: string = '';

  view: [number, number] = [700, 400];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser']) {
      this.updateWorkoutSummary();
    }
  }

  updateWorkoutSummary() {
    if (!this.selectedUser) return;

    const userWorkouts = this.workouts.filter(workout => workout.userName === this.selectedUser);

    const summary: WorkoutSummary[] = userWorkouts.reduce((acc, workout) => {
      const existing = acc.find(item => item.name === workout.workoutType);
      if (existing) {
        existing.value += workout.workoutMinutes;
      } else {
        acc.push({ name: workout.workoutType, value: workout.workoutMinutes });
      }
      return acc;
    }, [] as WorkoutSummary[]);

    this.workoutSummary = [...summary];
  }
}
