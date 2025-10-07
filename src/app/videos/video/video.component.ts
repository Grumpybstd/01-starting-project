import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {}
