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
}
