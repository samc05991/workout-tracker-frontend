import { Component, OnInit } from '@angular/core';
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

    exercises: Exercise[] = [];
    workout: Workout;
    submitted = false;
    editMetric: any = {};
    createExerciseModal: boolean = false;
    savedExerciseModal: boolean = false;

    constructor(
        private _workoutService: WorkoutService,
        private _exerciseService: ExerciseService,
        private _authService: AuthService,
        private _dataService: DataProviderService
    ) {
        this.workout = new Workout({});
        this.workout.exercises = [];

        this._exerciseService.exerciseSubject.subscribe(value => {
            this.exercises = this._exerciseService.exercises;
        });
    }

    submit() {
        this.workout.created_by = this._authService.getCurrentUserId();

        this._workoutService.addWorkout(this.workout).subscribe((response) => {});
    }

    ngOnInit() {
    }

    exerciseAddedFromList(exercise: Exercise) {
        const newExercise = new Exercise();

        newExercise.name = exercise.name;
        newExercise.metrics = exercise.metrics;

        this.workout.exercises.push(newExercise);
        this.exercises.push(newExercise);
    }

    exerciseAddedFromModal($event) {
        const newExercise = new Exercise();

        newExercise.name = $event.name;
        newExercise.metrics = $event.metrics;

        this.workout.exercises.push(newExercise);
        this.exercises.push(newExercise);
    }

    addExerciseInput(exercise: Exercise) {
        const newExercise = Object.assign({}, exercise);

        this.workout.exercises.push(newExercise);
    }

    updateMetric(metric, exercise) {
        console.log(exercise, metric);
    }
}
