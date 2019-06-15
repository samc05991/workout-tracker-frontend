import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { WorkoutService } from '../../services/workout.service';

import { User } from '../../models/user.model';
import { Workout } from '../../models/workout.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-workout-list',
    templateUrl: './workout-list.component.html',
    styleUrls: ['./workout-list.component.scss']
})

export class WorkoutListComponent implements OnInit {
    
    user: User;
    selectedWorkout: Workout;
    workouts: Workout[] = [];
    submitted = false;
    
    view: String;
    
    constructor(
        private _workoutService: WorkoutService, 
        private _exerciseService: ExerciseService, 
        private _authService: AuthService,
        private _router: Router,
    ) {
        this.user = this._authService.getCurrentUser();
        this.view = 'workout-builder';
    }

    ngOnInit() {
        this.workouts = this._workoutService.workouts;
    }

    /**
     * Opens up the <create-workout> component to edit an workout
     * @param {Workout} workout
     */
    editWorkout(workout: Workout) {
        this.selectedWorkout = workout;
        this.view = 'workout-builder';
    }

    toggleView(view: String) {
        this.view = view;
    }

    goBack() {
        this._router.navigate(['/dashboard']);
    }
}
