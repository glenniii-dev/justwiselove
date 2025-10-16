import { Component, signal } from '@angular/core';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Home } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}
