import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { SocketService } from 'src/app/utilities/services/socketService/socket.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, OnDestroy {

  constructor(private routes: ActivatedRoute, private socketService: SocketService) { }

  machineID: number;
  isMobile: any;

  ngOnInit(): void {

    this.isMobile = window.screen.width <= 821;

    this.routes.paramMap.subscribe(params => {
      let res = params.get('machineID');
      if (res != null) {
        this.machineID = +res;
      }
    })
    this.socketService.connect();
    this.socketService.subscribe(this.machineID);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth <= 821;
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
