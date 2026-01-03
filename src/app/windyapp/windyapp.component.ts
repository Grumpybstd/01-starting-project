import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-windyapp',
  standalone: true,
  imports: [],
  templateUrl: './windyapp.component.html',
  styleUrl: './windyapp.component.css',
})
export class WindyappComponent implements AfterViewInit {
  @ViewChild('windyContainer') windyContainer!: ElementRef;
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://windy.app/widgets-code/forecast/windy_forecast_async.js?v177';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    this.renderer.appendChild(this.windyContainer.nativeElement, script);
  }
}
