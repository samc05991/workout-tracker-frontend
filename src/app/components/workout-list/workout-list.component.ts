import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { WorkoutService } from '../../services/workout.service';

import { User } from '../../models/user.model';
import { Workout } from '../../models/workout.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
    selector: 'app-workout-list',
    templateUrl: './workout-list.component.html',
    styleUrls: ['./workout-list.component.scss']
})

export class WorkoutListComponent implements OnInit {

    user: User;
    workouts: Workout[] = [];
    submitted = false;

    view: String;

    constructor(private _workoutService: WorkoutService, private _exerciseService: ExerciseService, private _authService: AuthService) {
        this.user = this._authService.getCurrentUser();
        this.view = 'workout-list';
    }

    ngOnInit() {
        this._exerciseService.getExercises();
        this._workoutService.handleGetWorkouts();
        this.workouts = this._workoutService.workouts;
    }

    toggleView(view: String) {
        this.view = view;
    }
}
