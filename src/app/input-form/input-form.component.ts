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

  constructor(private formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      inputValue: ''
    });
  }

  ngOnInit(): void {
    this.targetLetterArray = this.target.split("");
  }

  onSubmit(data) {
    this.inputForm.reset();

    this.processAnswer(data.inputValue);

    if (data.inputValue.toLowerCase() === this.target.toLowerCase()) {
      this.complete.emit();
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
}
