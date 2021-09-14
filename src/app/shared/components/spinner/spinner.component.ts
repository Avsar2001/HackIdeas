import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastrService } from '../../services/toastr/toastr.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner!: boolean;

  constructor(
    private _spinner: SpinnerService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._spinner.getState().subscribe((state: boolean) => {
      this.showSpinner = state;
    }, err => {
      this._toastr.show("Error", err);
    });
  }

}
