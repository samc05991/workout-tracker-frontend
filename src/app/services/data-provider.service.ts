import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataProviderService {

    private selectWorkoutDate = new BehaviorSubject('changeWorkoutDate');
    currentWorkoutDate = this.selectWorkoutDate.asObservable();

    constructor() { }

    changeWorkoutDate(date: any) {
        this.selectWorkoutDate.next(date);
    }

    getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
}
