import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  /** nicked from https://codepen.io/P3R0/pen/MwgoKv */

  @ViewChild("canvas", { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  width = 600;
  height = 300;

  chars = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
  chinese: string[];
  fontSize;
  drops;

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.chinese = this.chars.split("");

    this.fontSize = 10;
    var columns = this.width / this.fontSize; //number of columns for the rain
    //an array of drops - one per column
    this.drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++)
      this.drops[x] = 1;

    timer(33, 33).subscribe(() => this.draw())

  }

  draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "#0F0"; //green text
    this.ctx.font = this.fontSize + "px arial";
    //looping over drops
    for (var i = 0; i < this.drops.length; i++) {
      //a random chinese character to print
      var text = this.chinese[Math.floor(Math.random() * this.chinese.length)];

      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      //incrementing Y coordinate
      this.drops[i]++;
    }
  }

}
