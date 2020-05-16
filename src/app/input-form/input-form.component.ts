import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.less']
})
export class InputFormComponent implements OnInit {

  @Input() type: string;

  @Input() target: string;

  @Input() passwordMode: string;

  @Output() complete = new EventEmitter();

  targetLetterArray: string[];

  faAngleRight = faAngleRight;
  faQuestion = faQuestion;

  inputForm;
  output = [];
  attempts: number;

  helpMessages: string[] = [
    "At least have a go first...",
    "Not case sensitive.",
    "All letters, no numbers or symbols.",
    "No spaces.",
    "Try more than one word.",
    "It's like hangman, y'know hangman right?"
  ]

  constructor(private formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      inputValue: ''
    });
  }

  ngOnInit(): void {
    this.attempts = 0;
    this.targetLetterArray = this.target.split("");
  }

  onSubmit(data) {
    if (data.inputValue == null || data.inputValue == "") {
      this.output = [];
    } else {
      this.attempts += 1;
      this.inputForm.reset();

      this.processAnswer(data.inputValue);

      if (data.inputValue.toLowerCase() === this.target.toLowerCase()) {
        this.complete.emit();
      }
    }
  }

  processAnswer(answer: string) {
    const answerArray = answer.split("");

    this.output = [];

    for (let i = 0; i < answerArray.length; i++) {
      if (i < this.targetLetterArray.length && answerArray[i].toLowerCase() === this.targetLetterArray[i].toLowerCase()) {

        let letter;
        if (this.passwordMode === "true") { // very silly but cba to figure out input bools at this stage...
          letter = "*";
        } else {
          letter = answerArray[i].toLowerCase();
        }

        this.output.push({
          letter: letter,
          colour: "green"
        });
      } else {
        this.output.push({
          letter: "*",
          colour: "red"
        });
      }
    }
  }

  getType() {
    if (this.passwordMode === "true") { // very silly but cba to figure out input bools at this stage...
      return "password";
    } else {
      return "text";
    }
  }

  getHelpMessage() {
    for (let i = 1; i < this.helpMessages.length; i++) {
      if (this.attempts < (i * 10)) {
        if (i == 1) {
          return this.helpMessages.slice(0, 1);
        } else {
          return this.helpMessages.slice(1, i);
        }
      }
    }
    return this.helpMessages.slice(1);
  }

  getHelpCountDown() {
    for (let i = 1; i < this.helpMessages.length; i++) {
      if (this.attempts < (i * 10)) {
        let remaining = (i * 10) - this.attempts;
        return "Next hint in " + remaining + " attempts."
      }
    }
    return "No more hints :(";
  }
}
