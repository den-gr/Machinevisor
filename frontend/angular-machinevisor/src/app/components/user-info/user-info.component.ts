import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  photo = '';
  userMix = Array();

  constructor(private apiService: APIService, public datepipe: DatePipe) { }

  ngOnInit(): void {

    let userInfo = Array("Name", "Surname", "ID", "Birth date");

    this.apiService.getUser().subscribe(res => {

      this.photo = environment.apiUrl + res.img_uri;

      const birthDate = this.datepipe.transform(res.birth_date, 'dd/MM/yyyy');

      let userData = Array(res.name, res.surname, res.user_id.toString(), birthDate);
      
      for(let i=0; i<userData.length; i++){
        this.userMix.push({key:userInfo[i], value:userData[i]})
      }
    });

  }

}
