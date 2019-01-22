import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';

import { EnvironmentConfig } from './environment-config.service';
import { AuthService } from './auth.service';

@Injectable()

export class ExerciseService {

    exercises: Exercise[] = [];
    exerciseIsEdit = new EventEmitter<Exercise>();

    constructor( private _http: HttpClient, private _envConfig: EnvironmentConfig, private _authService: AuthService ) {}

    get user(): User {
        return this._authService.getCurrentUser();
    }

    handleAddExercise (exercise: Exercise) {
        return this.addExercise(exercise).subscribe(
            (response: any) => {
                this.exercises.push(response.exercise);

                return exercise;
            },
            (error: any) => {}
        );
    }

    addExercise(exercise: Exercise) {
        exercise.created_by = this.user._id;

        return this._http.post<Exercise>(this._envConfig.getBaseApiUrl() + '/exercises/create-exercise', {exercise});
    }

    setExercises() {
        return this._http.get<Exercise[]>(this._envConfig.getBaseApiUrl() + '/exercises/' + this.user._id);
    }

    getExercises() {
        if (this.exercises.length >  0) {
            return this.exercises;
        }

        return this.setExercises().subscribe((result: any) => {
            const exercises = result.obj;
            const transformedExercises: Exercise[] = [];

            if (exercises.length > 0) {
                for (const exercise of exercises) {
                    const exerciseObject = new Exercise(exercise);

                    transformedExercises.push(exerciseObject);
                }
            }

            this.exercises = transformedExercises;

            return this.exercises;
        });
    }

    editExercise(exercise: Exercise) {
        this.exerciseIsEdit.emit(exercise);
    }

    // updateExercise(Exercise: Exercise) {
    //     const body = JSON.stringify(Exercise);
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.patch('http://localhost:3000/Exercise/' + Exercise.ExerciseId, body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => Observable.throw(error.json()));
    // }

    // deleteExercise(Exercise: Exercise) {
    //     this.Exercises.splice(this.Exercises.indexOf(Exercise), 1);
    //     return this.http.delete('http://localhost:3000/Exercise/' + Exercise.ExerciseId)
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => Observable.throw(error.json()));
    // }
}
