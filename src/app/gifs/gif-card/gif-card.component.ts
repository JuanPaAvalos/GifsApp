import { Component, Input, OnInit } from '@angular/core';
import { GifData } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.css']
})

export class GifCardComponent implements OnInit {
  @Input() gif!: GifData;

  constructor() { }

  ngOnInit(): void {
    if(this.gif === undefined) throw new Error ('Gif is required');
  }

}
