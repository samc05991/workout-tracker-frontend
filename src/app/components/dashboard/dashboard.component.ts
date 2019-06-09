import { Component, OnInit } from '@angular/core';

import { ExerciseService } from '../../services/exercise.service';
import { AuthService } from '../../services/auth.service';
import { WorkoutService } from '../../services/workout.service';

import { User } from '../../models/user.model';
import { Workout } from '../../models/workout.model';
import { Exercise } from '../../models/exercise.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    // Objects
    user: User;
    workouts: Workout[];
    exercises: Exercise[];

    // Controls
    submitted = false;

    options = {};

    constructor( private _workoutService: WorkoutService, private _authService: AuthService) {
        this.user = this._authService.getCurrentUser();
    }

    ngOnInit() {
        this.workouts = this._workoutService.workouts;
    }
}
