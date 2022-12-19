import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
  @Input() title: string;
  @Input() icon: string;
}
