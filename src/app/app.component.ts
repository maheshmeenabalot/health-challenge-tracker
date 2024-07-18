import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

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
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WorkoutFormComponent, WorkoutListComponent, WorkoutChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  workouts: Workout[] = [];
  workoutSummary: WorkoutSummary[] = [];
  isModalOpen = false;
  selectedUser: string = '';

  ngOnInit() {
    const initialData: Workout[] = [
      { userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { userName: 'Jane Smith', workoutType: 'Swimming', workoutMinutes: 60 },
      { userName: 'Mike Johnson', workoutType: 'Yoga', workoutMinutes: 50 }
    ];

    if (!localStorage.getItem('workouts')) {
      localStorage.setItem('workouts', JSON.stringify(initialData));
    }
    this.workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    this.updateWorkoutSummary();
  }

  addWorkout(workout: Workout) {
    this.workouts = [...this.workouts, workout]; // Create a new array reference
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
    this.updateWorkoutSummary();
    this.hideModal();
  }

  updateWorkoutSummary() {
    const summary: WorkoutSummary[] = this.workouts.reduce((acc, workout) => {
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

  showModal() {
    this.isModalOpen = true;
  }

  hideModal() {
    this.isModalOpen = false;
  }

  onUserSelected(userName: string) {
    this.selectedUser = userName;
  }
}
