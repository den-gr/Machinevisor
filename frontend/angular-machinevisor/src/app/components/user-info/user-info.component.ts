import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  photo = '../../../assets/img/homer.jpg';
  userInfo = Array();
  userMix = Array();

  constructor() { }

  ngOnInit(): void {

    this.userInfo = Array("Name", "Surname", "ID", "Task", "Birth date");
    let userData = Array("Homer", "Simpson", "1", "worker", "10/10/1965");

    for(let i=0; i<userData.length; i++){
      this.userMix.push({key:this.userInfo[i], value:userData[i]})
    }
  }

}
