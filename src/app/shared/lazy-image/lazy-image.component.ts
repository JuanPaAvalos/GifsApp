import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input() url!: string;
  @Input() alt: string = '';

  public hasLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(!this.url) throw new Error ('url is required')
  }

  onLoad(){
    this.hasLoaded = true;
    console.log('image loaded');

  }
}
