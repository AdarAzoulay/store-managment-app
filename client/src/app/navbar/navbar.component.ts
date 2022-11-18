import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @Input() status: boolean = false;
  @Output() changeStatus : EventEmitter<boolean> = new EventEmitter();
  
  public clickEvent() {
    this.status = !this.status;
    this.changeStatus.emit(this.status);
  }

}
