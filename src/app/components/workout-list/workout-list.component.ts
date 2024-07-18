import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  @Input() workouts: { userName: string, workoutType: string, workoutMinutes: number }[] = [];
  @Output() userSelected = new EventEmitter<string>(); // Add EventEmitter for user selection
  filteredWorkouts: { userName: string, workoutType: string, workoutMinutes: number }[] = [];
  paginatedWorkouts: { userName: string, workoutType: string, workoutMinutes: number }[] = [];
  searchQuery: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.applyFilterAndPagination();
  }

  searchWorkouts() {
    this.applyFilterAndPagination();
  }

  filterWorkouts() {
    this.applyFilterAndPagination();
  }

  applyFilterAndPagination() {
    let filtered = this.workouts;
    if (this.searchQuery) {
      filtered = filtered.filter(workout =>
        workout.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    if (this.filterType) {
      filtered = filtered.filter(workout => workout.workoutType === this.filterType);
    }
    this.filteredWorkouts = filtered;
    this.paginateWorkouts();
  }

  paginateWorkouts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginateWorkouts();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
  }

  selectUser(userName: string) {
    this.userSelected.emit(userName); // Emit selected user
  }
}
