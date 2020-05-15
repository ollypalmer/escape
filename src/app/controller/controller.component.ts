import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.less']
})
export class ControllerComponent implements OnInit {

  userStage = false;
  passwordStage = false;

  username = "nobhead"
  password = "whatadick"

  constructor() { }

  ngOnInit(): void {
  }

  usernameComplete() {
    this.userStage = true;
  }

  passwordComplete() {
    this.passwordStage = true;
  }

}
