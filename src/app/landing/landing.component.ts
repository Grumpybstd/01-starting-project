import { Component } from '@angular/core';
import { AudioComponentComponent } from '../shared/shared/audio.component/audio.component.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AudioComponentComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
