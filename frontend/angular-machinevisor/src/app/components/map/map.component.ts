import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private router: Router) { }

  click(machine: String){
    console.log("Ho cliccato trullallero rullalla! --> " + machine);
    this.router.navigate(['/machinePage', machine]);
  }

  ngOnInit(): void {
  }

}
