import { AfterViewInit, Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import * as core from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  
})

export class HeroComponent  {
  slides: {
    imgs: string;
    title: string;
    subtitle: string;
    text: string;
  }[] = [
    {
      imgs: 'assets/images/hs6.png',
      title: 'ssss',
      subtitle: 'dddddssddddd',
      text: 'dddddddd'
    },
    {
      imgs: 'assets/images/hs2.png',
      title: 'f',
      subtitle: 'dddddssddddd',
      text: 'dddddddd'
    },
    {
      imgs: 'assets/images/hs1.png',
      title: 'a',
      subtitle: 'dddddssddddd',
      text: 'dddffffddddd'
    }

  ];
}