import { Component, OnInit } from '@angular/core';
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
    dateContext: moment.Moment = moment();

    constructor() {
        this.selectedDate.dateMoment = moment();
     }

    ngOnInit() {
        this.getDaysArrayByMonth();
    }

    getDaysArrayByMonth() {
        let daysInMonth = this.dateContext.daysInMonth();

        this.arrDays = [];

        for(let i = 1; i <= daysInMonth; i++) {
            let date = this.dateContext.clone();
            let current = date.date(i);

            let dateObject = {
                dateMoment: date,
                selected: i === this.dateContext.date() ? true : false
            }

            this.arrDays.push(dateObject);
        }
        this.addInactiveDates();
    }

    addInactiveDates() {
        let date = this.dateContext.clone();

        let missingDays = date.startOf('month').day();

        for(let i = 1; i < missingDays; i++) {
            this.arrDays.unshift(false);
        }
    }

    addMonth() {
        this.dateContext.add(1, 'month');

        this.getDaysArrayByMonth();
    }

    selectDate(date: any) {
        this.selectedDate = date;
    }
}
