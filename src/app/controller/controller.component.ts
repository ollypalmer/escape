import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.less']
})
export class ControllerComponent implements OnInit {

  userStage = false;
  passwordStage = false;

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
