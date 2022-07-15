import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() name:string;

  initials = '';
  colorClass = "";
  colors = ['red', 'orange', 'green', 'blue', 'purple']

  constructor(private authService: AuthService) { }

  getInitials(){
    const splitName = this.name.split(' ');
    splitName.forEach((e: string) => this.initials = this.initials + e.charAt(0));
    this.initials.toUpperCase();
  }

  ngOnInit(): void {
    this.getInitials();
    this.colorClass = this.authService.getUserColor()!;
  }

}
