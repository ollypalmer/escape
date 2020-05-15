import { Component, OnInit } from '@angular/core';
import { ControllerComponent } from '../controller/controller.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalService.open(
      ControllerComponent, 
      {
        centered: true, 
        backdrop: "static",
        keyboard: false,
        backdropClass: "custom-backdrop",
        windowClass: 'dark-modal'
      });
  }

}
