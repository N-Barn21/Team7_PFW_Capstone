<<<<<<< HEAD
import { Component, Inject, OnInit} from '@angular/core';
import { BeaconService } from '../../../services/beacon.service';

=======
import { Component} from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
>>>>>>> 9e9e10e01fd86d14b181bdf8173407751348a099

@Component({
  selector: 'app-core-body-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css', './population.component.scss']
})

export class PopulationComponent {
  minValue: number = 0;
  maxValue: number = 24;
  options: Options = {
    ceil: 12,
    floor: 0,
    step: 24,
    translate: (value: number, label: LabelType): string => {
      var time = null;
      var hours = value;

      switch (label) {
        case LabelType.Low:
         if (hours < 12) {
           time = "AM";
         }
         else{
           time = "PM";
         }
         if (value == 0) {
          hours = 12;
        }
        if (hours > 12) {
            hours = hours - 12;
        }
          return '<b>Start</b> ' + hours + time;
        case LabelType.High:
          if (hours < 12 || hours == 24) {
            time = "AM";
          }
          else{
            time = "PM";
          }
          if (value == 0) {
            hours = 12;
          }
          if (hours > 12) {
              hours = hours - 12;
          }
          return '<b>End</b> ' + hours + time;
        default:
          return hours + time;
      }
    },
    showSelectionBar: true,
    stepsArray: [
      {value: 0},
      {value: 1, legend: 'AM'},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5},
      {value: 6},
      {value: 7},
      {value: 8},
      {value: 9},
      {value: 10},
      {value: 11},
      {value: 12, legend: 'PM'},
      {value: 13},
      {value: 14},
      {value: 15},
      {value: 16},
      {value: 17},
      {value: 18},
      {value: 19},
      {value: 20},
      {value: 21},
      {value: 22},
      {value: 23},
      {value: 24, legend: 'AM'}
    ],
    selectionBarGradient: {
      from: 'black',
      to: 'green', 

    },
    showTicks: true,
    draggableRange: true,
    
  };
}
