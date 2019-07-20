import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';

import { AuthService } from './auth.service';
import { DataProviderService } from './data-provider.service';
import { EnvironmentConfig } from './environment-config.service';

@Injectable()

export class ExerciseService {

    exercises: Exercise[] = [];
    exerciseSubject: Subject<Exercise> = new Subject<Exercise>();
    exerciseIsEdit = new EventEmitter<Exercise>();

    gettingExercises: boolean = false;

    constructor(private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _authService: AuthService,
        private _dataProvider: DataProviderService
    ) {
        this.exerciseSubject.subscribe((value: Exercise) => {
            this.exercises.push(value);
        });
    }

    get user(): User {
        return this._authService.getCurrentUser();
    }

    updateExerciseList(exercise: Exercise) {
        this.exerciseSubject.next(exercise);
    }

    handleAddExercise (exercise: Exercise) {
        return this.addExercise(exercise).subscribe(
            (response: any) => this.updateExerciseList(exercise),
            (error: any) => {}
        );
    }

    addExercise(exercise: Exercise) {
        const params = { exercise: exercise };
        params.exercise.created_by = this.user._id;

        return this._http.post<Exercise>(this._envConfig.getBaseApiUrl() + '/exercises/create-exercise', { params });
    }

    setExercises() {
        return this._http.get<Exercise[]>(this._envConfig.getBaseApiUrl() + '/exercises/' + this.user._id, {});
    }

    getExercises() {
        if (this.exercises.length > 0 || this.gettingExercises) {
            return this.exercises;
        }

        this.gettingExercises = true;

        return this.setExercises().subscribe((result: any) => {
            this.exercises = [];

            const exercises = result.obj;

            if (exercises.length > 0) {
                for (const exercise of exercises) {
                    const exerciseObject = new Exercise(exercise);

                    this.updateExerciseList(exerciseObject);
                }
            }

            this.gettingExercises = false;
        });

    }

    editExercise(exercise: Exercise) {
        this.exerciseIsEdit.emit(exercise);
    }

    updateExercise(exercise: Exercise) {
        const params = { exercise: exercise };
        params.exercise.created_by = this.user._id;

        return this._http.patch<Exercise>(this._envConfig.getBaseApiUrl() + '/exercises/edit-exercise', { params });
    }

    deleteExercise(exercise: Exercise) {
        this.exercises.splice(this.exercises.indexOf(exercise), 0);

        return this._http.delete(this._envConfig.getBaseApiUrl() + '/exercises/' + exercise._id).subscribe((response) => {
            return response;
        });
    }
}
