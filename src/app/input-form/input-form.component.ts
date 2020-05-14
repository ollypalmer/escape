import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.less']
})
export class InputFormComponent implements OnInit {

  @Input() target: string;

  targetLetterArray: string[];

  username;
  userform;
  output = [];

  constructor(private formBuilder: FormBuilder) {
    this.userform = this.formBuilder.group({
      username: ''
    });
  }

  ngOnInit(): void {
    this.targetLetterArray = this.target.split("");
  }

  onSubmit(data) {
    this.userform.reset();

    this.username = data.username;

    this.processAnswer(data.username);

    if (data.username.toLowerCase() === this.target.toLowerCase()) {
      alert('yay');
    }
  }

  processAnswer(answer: string) {
    const answerArray = answer.split("");

    this.output = []

    for (let i = 0; i < answerArray.length; i++) {
      if (i < this.targetLetterArray.length && answerArray[i].toLowerCase() === this.targetLetterArray[i].toLowerCase()) {
        this.output.push(answerArray[i].toLowerCase());
      } else {
        this.output.push("*");
      }
    }
  }

  getLetterColour(letter) {
    if (letter === "*") {
      return "red";
    } else {
      return "green";
    }
  }

}
