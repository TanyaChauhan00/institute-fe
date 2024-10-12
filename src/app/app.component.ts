import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techglide-test';
  @HostListener('document:contextmenu', ['$event'])
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

  // Disable copy, cut, and paste globally
  @HostListener('document:copy', ['$event'])
  disableCopy(event: ClipboardEvent): void {
    event.preventDefault();
  }

  @HostListener('document:cut', ['$event'])
  disableCut(event: ClipboardEvent): void {
    event.preventDefault();
  }

  @HostListener('document:paste', ['$event'])
  disablePaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  // Disable certain key combinations (F12, Ctrl+Shift+I/J, Ctrl+U)
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Prevent F12
    if (event.key === 'F12') {
      event.preventDefault();
    }
    // Prevent Ctrl+Shift+I (Chrome Dev Tools)
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
      event.preventDefault();
    }
    // Prevent Ctrl+Shift+J (Console)
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
      event.preventDefault();
    }
    // Prevent Ctrl+U (View Source)
    if (event.ctrlKey && event.key === 'U') {
      event.preventDefault();
    }
  }
}