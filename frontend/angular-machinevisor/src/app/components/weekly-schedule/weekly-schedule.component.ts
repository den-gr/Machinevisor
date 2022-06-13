import { Component, OnInit } from '@angular/core';

export interface Schedule {
  day: string;
  AM: string;
  PM: string;
}

const ELEMENT_DATA: Schedule[] = [
  {day: "Monday", AM: '09:00-13:00', PM: '14:00-18:00'},
  {day: "Tuesday", AM: '09:00-13:00', PM: '14:00-18:00'},
  {day: "Wednesday", AM: '09:00-13:00', PM: '14:00-18:00'},
  {day: "Thursday", AM: '09:00-13:00', PM: '14:00-18:00'},
  {day: "Friday", AM: '09:00-13:00', PM: '14:00-18:00'},
]

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  constructor() { }

  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['day', 'AM', 'PM'];

  ngOnInit(): void {
  }

}
