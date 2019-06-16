import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { Workout } from '../../models/workout.model';

import { ExerciseService } from '../../services/exercise.service';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-create-workout',
    templateUrl: './create-workout.component.html',
    styleUrls: ['./create-workout.component.scss']
})

export class CreateWorkoutComponent implements OnInit {

    // the exercises that populate the exercise list
    exercises: Exercise[] = [];

    // the workout being created/edited
    @Input() workoutToEdit: Workout = undefined;
    @Input() action: string;

    workout: Workout;

    // this instance of the workout that will be added to the statistics array
    workoutOccurrence: any = {
        date: {},
        exercises: []
    };

    // if a specific exercise has been selected
    selectedExercise: Exercise = undefined;
    selectedExerciseIndex: number = undefined;

    // if a number of exercises are selected in the editor, their indexes are here
    selectedExercises: {} = {};

    // toggle to opemn the create exercise modal
    createExerciseModal: boolean = false;

    // toggle to open the exercise list
    savedExerciseModal: boolean = false;

    constructor(
        private _workoutService: WorkoutService,
        private _exerciseService: ExerciseService,
        private _authService: AuthService
    ) {
        //initialize and subscribe to the exercise lists
        this.exercises = this._exerciseService.exercises;

        this._exerciseService.exerciseSubject.subscribe(value => {
            this.exercises = this._exerciseService.exercises;
        });
    }

    submit() {
        this.workout.created_by = this._authService.getCurrentUserId();

        if(this.action === 'new') {
            this.workout.statistics.push(this.workoutOccurrence);
            this._workoutService.addWorkout(this.workout).subscribe((response) => {});
        }

        // if(this.action === 'edit') {
        //     this._workoutService.editWorkout(this.workout).subscribe((response) => {});
        // }

        if(this.action === 'add-occurrence') {
            this.workout.statistics.push(this.workoutOccurrence);
            this._workoutService.addWorkoutOccurrence(this.workout).subscribe((response) => {});
        }
    }

    ngOnInit() {
        this.workout = !this.workoutToEdit ? new Workout({statistics: []}) : this.workoutToEdit;

        if(this.workout.statistics.length > 0) {
            let length = this.workout.statistics.length;

            this.workoutOccurrence.date = this.workout.statistics[length - 1].date;
            this.workoutOccurrence.exercises = this.workout.statistics[length - 1].exercises;
        }
    }

    /**
     * Opens up the <create-exercise> component to edit an exercise
     * @param {Exercise} exercise
     */
    editExerciseInWorkout(exercise: Exercise, i: number) {
        this.selectedExercise = exercise;
        this.selectedExerciseIndex = i;
        this.createExerciseModal = true;
    }

    /**
     * When exercise is added from the list
     * @param {Exercise} exercise
     */
    exerciseAddedFromList(exercise: Exercise) {
        const newExercise = new Exercise();

        newExercise.name = exercise.name;
        newExercise.metrics = exercise.metrics;

        this.workoutOccurrence.exercises.push(newExercise);
    }

    /**
     * When exercise is added from <create-exercise> 
     * @param $event 
     * @param {number} i 
     */
    exerciseAddedFromModal($event, i?: number) {
        const newExercise = new Exercise();

        newExercise.name = $event.name;
        newExercise.metrics = $event.metrics;

        // if we have an index, we are editing
        if(i || i === 0) {
            this.workoutOccurrence.exercises[i] = newExercise;
        }
        else {
            this.workoutOccurrence.exercises.push(newExercise);
            this.exercises.push(newExercise);
        }
    }

    closeCreateExerciseModal() {
        this.createExerciseModal = false; 
        this.selectedExercise = undefined
    }

    /**
     * Select an exercise
     * @param {number} i 
     */
    selectExercise(i: number) {
        if(this.selectedExercises[i]) {
            this.selectedExercises[i] = false;
        }
        else {
            this.selectedExercises[i] = true;
        }
    }

    /**
     * Adds a preset rest period
     */
    addRestPeriod() {
        let exercise = new Exercise({
            metrics: [{name: "Rest", type: "time", value: {seconds: 30}}],
            name: "Rest"
        });

        this.workoutOccurrence.exercises.push(exercise);
    }

    /**
     * Adds another round of the selected exercises
     */
    addRounds() {
        for(let key in this.selectedExercises) {
            this.workoutOccurrence.exercises.push(this.workoutOccurrence.exercises[key])
        }
    }

    /**
     * Remove an exercise
     * @param {number} i 
     */
    removeExerciseFromWorkout(i) {
        this.workoutOccurrence.exercises.splice(i, 1);
    }
}
