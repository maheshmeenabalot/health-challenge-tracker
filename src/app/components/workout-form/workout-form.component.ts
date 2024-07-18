import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = 'Running';
  workoutMinutes: number | null = null;

  @Output() workoutAdded = new EventEmitter<{ userName: string, workoutType: string, workoutMinutes: number }>();

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes) {
      this.workoutAdded.emit({
        userName: this.userName,
        workoutType: this.workoutType,
        workoutMinutes: this.workoutMinutes
      });
      this.userName = '';
      this.workoutType = 'Running';
      this.workoutMinutes = null;
    }
  }
}
