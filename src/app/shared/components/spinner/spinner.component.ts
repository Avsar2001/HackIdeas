import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner!: boolean;

  constructor(
    private _spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this._spinner.getState().subscribe((state: boolean) => {
      this.showSpinner = state;
    }, err => {
      window.alert(err);
    });
  }

}
