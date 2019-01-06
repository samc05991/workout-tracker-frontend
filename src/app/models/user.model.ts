import { Exercise } from './exercise.model';
import { Workout } from './workout.model';

export class User {

    public _id: string;
    public userName: string;
    public email: string;
    public exercises: Exercise[];
    public workouts: Workout[];

    constructor() {}
}
