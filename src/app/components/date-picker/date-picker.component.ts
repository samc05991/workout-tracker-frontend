import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataProviderService } from '../../services/data-provider.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html'
})

export class DatePickerComponent implements OnInit {
    model: Subject<boolean> = new Subject<boolean>();

    constructor(private _dataService: DataProviderService) {}

    ngOnInit() {
        this.model.subscribe((value) => this._dataService.changeWorkoutDate(value));
    }

    onDateSelection(date) {
        this.model.next(date);
    }
}
