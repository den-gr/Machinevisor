import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';

export interface Schedule{
  day: string,
  AM: string,
  PM: string
}

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  constructor(private apiService: APIService) { }

  dataSource: Schedule[] = Array();
  displayedColumns: string[] = ['day', 'AM', 'PM'];

  ngOnInit(): void {
    this.apiService.getUser().subscribe(res => {
        
        const schedule: Schedule[] = [
          {day: 'monday', AM: res.work_sheet.monday.first_shift, PM: res.work_sheet.monday.second_shift},
          {day: 'tuesday', AM: res.work_sheet.tuesday.first_shift, PM: res.work_sheet.tuesday.second_shift},
          {day: 'wednesday', AM: res.work_sheet.wednesday.first_shift, PM: res.work_sheet.wednesday.second_shift},
          {day: 'thursday', AM: res.work_sheet.thursday.first_shift, PM: res.work_sheet.thursday.second_shift},
          {day: 'friday', AM: res.work_sheet.friday.first_shift, PM: res.work_sheet.friday.second_shift}
        ];
        this.dataSource = schedule;
    });

    console.log(this.dataSource)
  }

}
