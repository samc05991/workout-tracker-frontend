import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Exercise } from '../../models/exercise.model';
import { Workout } from '../../models/workout.model';
import { User } from '../../models/user.model';

import { ExerciseService } from '../../services/exercise.service';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { DataProviderService } from '../../services/data-provider.service';

@Component({
    selector: 'app-create-workout',
    templateUrl: './create-workout.component.html',
    styleUrls: ['./create-workout.component.scss']
})

export class CreateWorkoutComponent implements OnInit {

    user: User;
    exercises: Exercise[] = [];
    workoutExercise: Exercise[] = [];
    workout: Workout;
    submitted = false;
    editMetric: any = {};

    constructor(
        private _workoutService: WorkoutService,
        private _exerciseService: ExerciseService,
        private _authService: AuthService,
        private _dataService: DataProviderService
    ) {
        // this.user = this._authService.getCurrentUser();
        this.workout = new Workout({});
        this.exercises = this._exerciseService.exercises;
    }

    submit() {
        this.workout.exercises = this.workoutExercise;
        this.workout.created_by = this.user._id;

        this._workoutService.addWorkout(this.workout);
    }

    ngOnInit() {
        this._dataService.currentWorkoutDate.subscribe(date => {
            this.workout.date = date;
        });
    }

    addExerciseInput( exercise: Exercise) {
        const newExercise = Object.assign({}, exercise);

        this.workoutExercise.push(newExercise);
    }

    updateMetric(input, metric, exercise) {
        input.edit = false;

        exercise.metrics[metric.key][input.key] = this.editMetric.value;
    }
}
