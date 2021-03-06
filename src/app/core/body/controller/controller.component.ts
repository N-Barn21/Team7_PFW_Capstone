import { ChangeContext } from "ng5-slider";
import { Timeset } from "./../routing/timeset";
import { DatePipe } from "@angular/common";
import { BeaconService } from "./../../../services/beacon.service";
import { Beacon } from "./../../../services/beacon";
import { Component, ViewChild, EventEmitter, Output } from "@angular/core";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from 'ngx-spinner';

import {
  MatButton,
  MatSlideToggle,
  MatInput,
  MatSlideToggleChange,
  MatDatepickerInputEvent
} from "@angular/material";
import { LabelType, Options } from "ng5-slider";
import { FormGroup, FormControl } from "@angular/forms";
interface External {
  createExcel: Function
}

declare function createExcel(beacon):any
// This is for the gender select
export interface Gender {
  value: string;
  viewValue: string;
}

// This is for the weight select
export interface Weight {
  value: string;
  viewValue: string;
}

// This is for the height select
export interface Height {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-core-body-controller",
  templateUrl: "./controller.component.html",
  styleUrls: ["./controller.component.css", "./controller.component.scss"]
})
export class ControllerComponent {
  @Output() outputToParent = new EventEmitter<any>();
  public beacons: Beacon[];
  public beacon: Beacon;
  public routeBeacons: Beacon[];
  isLoading = false;
  errorMessage: String;
  heatList: any
  empty: any[] = [0];
  public beaconSet: any[];
  panelOpenState = false;
  events: string[] = [];

  NotifyParent( selected : any){
    this.outputToParent.emit(this.empty)
    this.outputToParent.emit(selected);
  }


downloadFile() {

  let data = this.beacons
  const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var a = document.createElement('a');
  var blob = new Blob([csvArray], {type: 'text/csv' }),
  url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = "myFile.csv";
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

  // Form Variables for Input clearing
  value1 = "";
  value2 = "";
  weightValue = "";
  heightValue = "";
  genderValue = "";
  checked_HD = false;
export(){
  console.log("function reach")
createExcel(this.beacons)
}
  @ViewChild("dp1", {
    read: MatInput
  })
  dp1: MatInput;

  @ViewChild("dp2", {
    read: MatInput
  })
  dp2: MatInput;

  @ViewChild("slidetoggle", {
    read: MatSlideToggle
  })
  slidetoggle: MatSlideToggle;

  /* user-event-slider START */
  startDate: string = '';
  endDate: string = '';
  startTime: string = '00:00:00';
  endTime: string = '23:59:59';

  /* Time slider value reset */
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([0, 24])
  });

  /* Start Time Picker Variables */
  minValue1: number = 0;
  maxValue1: number = 24;
  options1: Options = {
    ceil: 12,
    floor: 0,
    step: 24,
    translate: (value: number, label: LabelType): string => {
      var time = null;
      var hours = value;
      // Convert military time to standard time
      switch (label) {
        case LabelType.Low:
          if (hours < 12) {
            time = "AM";
          } else {
            time = "PM";
          }
          if (value == 0) {
            hours = 12;
          }
          if (hours > 12) {
            hours = hours - 12;
          }
          return "<b>Start</b> " + hours + time;
        case LabelType.High:
          if (hours < 12 || hours == 24) {
            time = "AM";
          } else {
            time = "PM";
          }
          if (value == 0) {
            hours = 12;
          }
          if (hours > 12) {
            hours = hours - 12;
          }
          return "<b>End</b> " + hours + time;
        default:
          return hours + time;
      }
    },
    showSelectionBar: true,
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
      { value: 11 },
      { value: 12 },
      { value: 13 },
      { value: 14 },
      { value: 15 },
      { value: 16 },
      { value: 17 },
      { value: 18 },
      { value: 19 },
      { value: 20 },
      { value: 21 },
      { value: 22 },
      { value: 23 },
      { value: 24 }
    ],
    selectionBarGradient: {
      from: "rgb(30, 137, 51)",
      to: "rgb(21, 40, 22)"
    },
    showTicks: true,
    draggableRange: true
  };
  /* End Time Picker Variables */

  // Gender Select
  genders: Gender[] = [
    { value: "none-0", viewValue: "" },
    { value: "male-1", viewValue: "Male" },
    { value: "female-2", viewValue: "Female" },
    { value: "other-3", viewValue: "Other" },
    { value: "all-4", viewValue: "All" }
  ];

  // Weight Select
  weights: Weight[] = [
    { value: "1-0", viewValue: "" },
    { value: "2-1", viewValue: "1 - 25 lbs" },
    { value: "3-2", viewValue: "26 - 50 lbs" },
    { value: "4-3", viewValue: "51 - 75 lbs" },
    { value: "5-4", viewValue: "76 - 100 lbs" },
    { value: "6-5", viewValue: "101 - 125 lbs" },
    { value: "7-6", viewValue: "126 - 150 lbs" },
    { value: "8-7", viewValue: "151 - 175 lbs" },
    { value: "9-8", viewValue: "176 - 200 lbs" },
    { value: "10-9", viewValue: "201 - 225 lbs" },
    { value: "11-10", viewValue: "226 - 250 lbs" },
    { value: "12-11", viewValue: "251 - 275 lbs" },
    { value: "13-12", viewValue: "276 - 300 lbs" },
    { value: "14-13", viewValue: "300 + lbs" },
    { value: "15-14", viewValue: "All" }
  ];

  // Height Select
  heights: Height[] = [
    { value: "1-0", viewValue: "" },
    { value: "2-1", viewValue: "4'6 - 4'7 in." },
    { value: "3-2", viewValue: "4'7 - 4'8 in." },
    { value: "4-3", viewValue: "4'8 - 4'9 in." },
    { value: "5-4", viewValue: "4'9 - 4'10 in." },
    { value: "6-5", viewValue: "4'10 - 4'11 in." },
    { value: "7-6", viewValue: "4'11 - 5'0 in." },
    { value: "8-7", viewValue: "5'0 - 5'1 in." },
    { value: "9-8", viewValue: "5'1 - 5'2 in." },
    { value: "10-9", viewValue: "5'2 - 5'3 in." },
    { value: "11-10", viewValue: "5'3 - 5'4 in." },
    { value: "12-11", viewValue: "5'4 - 5'5 in." },
    { value: "13-12", viewValue: "5'5 - 5'6 in." },
    { value: "14-13", viewValue: "5'6 - 5'7 in." },
    { value: "15-14", viewValue: "5'7 - 5'8 in." },
    { value: "16-15", viewValue: "5'8 - 5'9 in." },
    { value: "17-16", viewValue: "5'9 - 5'10 in." },
    { value: "18-17", viewValue: "5'10 - 5'11 in." },
    { value: "19-18", viewValue: "5'11 - 6'0 in." },
    { value: "20-19", viewValue: "6'1 - 6'2 in." },
    { value: "21-20", viewValue: "6'2 +  in." },
    { value: "22-21", viewValue: "All" }
  ];

  constructor(
    private beaconService: BeaconService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
  }

  // Function to call the backend call to get the data from db
  getBeaconSets() {
    
    if(this.startDate && this.endDate && this.endTime && this.startTime){
    this.spinner.show()

      
    this.isLoading = true;
    this.beaconService
      .getBeaconSets(this.startDate, this.endDate, this.startTime, this.endTime)
      .subscribe((data: Beacon[]) => {
        this.isLoading = false;
        this.beacons = data;
        this.spinner.hide();
      });
    }
  }

  // get change result for time selection
  onUserChange(changeContext: ChangeContext): void {

  }

  // get end result for time selection
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.startTime = `${this.getChangeStartString(changeContext)}`;
    this.endTime = `${this.getChangeEndString(changeContext)}`;
    this.getBeaconSets();
    this.NotifyParent(this.beacons);
  }

  // Update the string Starttime value
  getChangeStartString(changeContext: ChangeContext): string {
    const zerolowValue = changeContext.value < 10 ? "0" : ""; // to put zero for the time format
    this.startTime = `${zerolowValue}${changeContext.value}:00:00`; // selected start time
    return this.startTime;
  }

  // Update the string Starttime value
  getChangeEndString(changeContext: ChangeContext): string {
    const zerohighValue = changeContext.highValue < 10 ? "0" : ""; // to put zero for the time format
    this.endTime = `${zerohighValue}${changeContext.highValue}:00:00`; // selected end time
    return this.endTime;
  }

  /* user-event-slider END */

  /* button*/

  onSelect(reset: Timeset) {
    console.log(JSON.stringify(reset));
  }

  // Start Date Listener
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const eventDate = new Date(event.value); // Datepicker Date Value
    const formattedDate = this.datePipe.transform(eventDate, "yyyy-MM-dd"); // Formatted new Date

    // Checking for which datepicker is being used
    if (event.targetElement.id === 'dp1') {
      this.startDate = formattedDate;
    } else if (event.targetElement.id === 'dp2') {
      this.endDate = formattedDate;
    }
    this.getBeaconSets();
    this.NotifyParent(this.beacons);
  }

  // End of Date Picker Extraction

  // Start of Toggle Slider Logic

  toggle(event: MatSlideToggleChange) {
    if (event.checked) {
      document.getElementById("dp2_div").style.display = "";
    } else {
      document.getElementById("dp2_div").style.display = "none";
    }
  }

  // End of Toggle Slider Logic

  // Start of Reset button for date and time

  resetDate(type: MatButton) {
    this.dp1.value = "";
    this.dp2.value = "";
    this.slidetoggle.checked = true;
    document.getElementById("dp2_div").style.display = "none";
    this.sliderForm.reset({ sliderControl: [0, 24] });
  
    this.endDate = ''
    this.startDate = ''
    this.startTime = ''
    this.endTime = ''
  }

  // END of Reset button for date and time

  // START of Reset button for Other Options

  resetOptions(): void {
    this.value1 = "";
    this.value2 = "";
    this.weightValue = "";
    this.heightValue = "";
    this.genderValue = "";
    this.checked_HD = false;
  }

  // END of Reset button for Other Options
}
