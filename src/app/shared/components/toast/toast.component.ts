import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr/toastr.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  toasts: any[] = [];

  constructor(private _toastService: ToastrService) { }

  ngOnInit(): void {
    this._toastService.getToasts().subscribe(data => {
      this.toasts = data;
    })
  }

}
