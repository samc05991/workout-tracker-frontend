import { Exercise } from './exercise.model';
import * as moment from 'moment';

export class WorkoutOccurrence {
    public date: String = moment().format('YYYYMMDD');
    public exercises: Exercise[] = [];

    constructor(workoutOccurrence: any = {}) {
        Object.assign(this, workoutOccurrence);
    }
}
