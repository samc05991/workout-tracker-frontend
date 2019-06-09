import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Exercise } from '../../models/exercise.model';
import { User } from '../../models/user.model';

import { ExerciseService } from '../../services/exercise.service';
import { AuthService } from '../../services/auth.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

    @Input() exercise?: Exercise;
    @Input() exerciseIndex?: number;
    @Output() exerciseAdded = new EventEmitter<Exercise>();
    // model: Subject<boolean> = new Subject<boolean>();

    user: User;
    submitted = false;

    metricName = '';
    metricType = 'number';
    metricValue: any = {};
    metrics: any = [];
    newMetric: any = {};
    revealInputs: boolean = false;
    editMetric: boolean = false;

    constructor(
        private _exerciseService: ExerciseService,
        private modalService: NgbModal,
        config: NgbModalConfig,
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }
    
    ngOnInit() {
        if(!this.exercise) {
            this.exercise = new Exercise();
        }
    }

    addMetric(i?: number) {
        const metric = {
            name: this.metricName,
            type: this.metricType,
            value: this.metricValue
        };

        if(i || i === 0) {
            this.exercise.metrics[i] = metric;
            this.editMetric = false;
        }
        else {
            this.exercise.metrics.push(metric);
        }

        this.revealInputs = false;
    }

    toggleInputs(i?: number) {
        this.revealInputs = !this.revealInputs;

        if(i || i === 0) {
            this.editMetric = true;
            this.metricName = this.exercise.metrics[i].name;
            this.metricType = this.exercise.metrics[i].type;
            this.metricValue = this.exercise.metrics[i].value;  
        }
    }

    saveExercise() {
        this._exerciseService.addExercise(this.exercise).subscribe((response: any) => {
            this.exerciseAdded.emit(this.exercise);
        });
    }

    open(content) {
        this.modalService.open(content);
    }
}
