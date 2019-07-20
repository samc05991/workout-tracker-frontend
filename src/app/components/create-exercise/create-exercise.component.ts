import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Exercise } from '../../models/exercise.model';
import { User } from '../../models/user.model';

import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

    @Input() exercise?: Exercise;
    @Input() exerciseIndex: any = undefined;
    @Output() exerciseAdded = new EventEmitter();
    @Output() closed = new EventEmitter<boolean>();

    user: User;
    submitted = false;
    newMetric: any = {
        metricName: 'Reps',
        metricType: 'number',
        metricValue: undefined
    }
    metrics: any = [];
    revealInputs: boolean = false;
    editMetric: boolean = false;

    constructor(
        private _exerciseService: ExerciseService
    ) {
    }
    
    ngOnInit() {
        if(!this.exercise) {
            this.exercise = new Exercise();
        }
    }

    /**
     * If i, editing metrics, else adding new
     * @param {number} i 
     */
    addMetric(i?: number) {
        if(i >= 0) {
            this.exercise.metrics[i] = Object.assign(this.exercise.metrics[i], this.newMetric)

            this.editMetric = false;
        }
        else {
            this.exercise.metrics.push(Object.assign({}, this.newMetric));
        }

        this.newMetric = {
            metricValue: {}
        };

        this.revealInputs = false;
    }

    /**
     * If i, editing metrics, else adding new
     * @param {number} i 
     */
    toggleInputs(i?: number) {
        this.revealInputs = !this.revealInputs;

        if(i >= 0) {
            this.editMetric = true;
            this.newMetric.metricName = this.exercise.metrics[i].metricName;
            this.newMetric.metricType = this.exercise.metrics[i].metricType;
            this.newMetric.metricValue = this.exercise.metrics[i].metricValue;  
        }
    }

    saveExercise() {
        this._exerciseService.addExercise(this.exercise).subscribe((response: any) => {
            let data = {
                exercise: this.exercise,
                index: this.exerciseIndex
            }

            this.exerciseAdded.emit(data);
        });
    }

    close() {
        this.closed.emit(true);
    }
}
