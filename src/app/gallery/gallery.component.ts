import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements AfterViewInit {
  // tempRef = 'myVideo1';

  // @ViewChild(tempRef) videoPlayer!: ElementRef;

  ngAfterViewInit() {
    // You can also add other video properties here, like a poster image.
    // console.log('tempRef here ' + this.tempRef);
  }

  // Create a method to play/pause the video when the video element is clicked.
  // toggleVideo() {
  //   const video: HTMLVideoElement = this.videoPlayer.nativeElement;
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  // }
}
