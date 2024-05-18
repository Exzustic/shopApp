import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ShopApp';
  loadedNavigation = 'recipe';

  onNavigate(event: string) {
    this.loadedNavigation = event;
  }
}
