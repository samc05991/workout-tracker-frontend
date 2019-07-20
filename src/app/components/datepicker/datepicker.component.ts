import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
    arrDays: any[] = [];
    calendar: any = {};
    month: string = "Motnh";
    selectedDate: any = {};
    showCalendar: boolean = false;

    @Input() currentDate = moment();
    @Output() dateAdded = new EventEmitter();

    constructor() {
        this.selectedDate.dateMoment = this.currentDate;
     }

    ngOnInit() {
        this.getDaysArrayByMonth();
    }

    getDaysArrayByMonth() {
        let daysInMonth = this.currentDate.daysInMonth();

        this.arrDays = [];

        for(let i = 1; i <= daysInMonth; i++) {
            let date = this.currentDate.clone();
            let current = date.date(i);

            let dateObject = {
                dateMoment: date,
                selected: i === this.currentDate.date() ? true : false
            }

            this.arrDays.push(dateObject);
        }

        this.addInactiveDates();
    }

    addInactiveDates() {
        let date = this.currentDate.clone();

        let missingDays = date.startOf('month').day();

        for(let i = 1; i < missingDays; i++) {
            this.arrDays.unshift(false);
        }
    }

    addMonth() {
        this.currentDate.add(1, 'month');

        this.getDaysArrayByMonth();
    }

    subtractMonth() {
        this.currentDate.subtract(1, 'month');

        this.getDaysArrayByMonth();
    }

    selectDate(date: any) {
        this.selectedDate = date;

        this.dateAdded.emit(this.selectedDate);
    }
}
