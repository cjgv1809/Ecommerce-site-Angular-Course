import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('waveform') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    // we used ngAfterViewInit lifecycle hook to make sure the DOM is ready before we initialize the wavesurfer.js
    this.ws = WaveSurfer.create({
      container: this.container.nativeElement,
      url: this.audioUrl,
    });
    this.ws.on('play', () => {
      this.isPlaying.set(true);
    });
    this.ws.on('pause', () => {
      this.isPlaying.set(false);
    });
  }

  playPause() {
    this.ws.playPause();
  }
}
