import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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

    addExercise(exercise: Exercise) {
        exercise.created_by = this.user._id;
        const body = JSON.stringify(exercise);

        return this._http.post(this._envConfig.getBaseApiUrl() + '/exercises/create-exercise', body)
            .subscribe((response: any) => {
                const newExercise = new Exercise(response.json().obj);

                this.exercises.push(exercise);

                return exercise;
            }
        );
    }

    setExercises() {
        return this._http.get( this._envConfig.getBaseApiUrl() + '/exercises/' + this.user._id )
            .subscribe((response: any) => {
                const exercises = response.json().obj;
                const transformedExercises: Exercise[] = [];

                if (exercises.length > 0) {
                    for (const exercise of exercises) {
                        const exerciseObject = new Exercise(exercise);

                        transformedExercises.push(exerciseObject);
                    }
                }

                return transformedExercises ? transformedExercises : [];
            }
        );
    }

    getExercises() {
        if (this.exercises.length >  0) {
            return this.exercises;
        }

        // this.setExercises().subscribe((exercises: Exercise[]) => {
        //     this.exercises = exercises;

        //     return this.exercises;
        // });
    }
    // editExercise(Exercise: Exercise) {
    //     this.ExerciseIsEdit.emit(Exercise);
    // }

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
