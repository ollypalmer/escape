import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'password-cracker-game';

  userStage = false;
  passwordStage = false;

  usernameComplete() {
    this.userStage = true;
  }

  passwordComplete() {
    this.passwordStage = true;
  }
}
