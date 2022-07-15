import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-machine-image',
  templateUrl: './machine-image.component.html',
  styleUrls: ['./machine-image.component.scss']
})
export class MachineImageComponent implements OnInit {

  @Input() machineID:any;

  photo = '';

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getMachineInfo(this.machineID.toString()).subscribe(res => {
      this.photo = environment.apiUrl + res.img_uri;
    });
  }

}
