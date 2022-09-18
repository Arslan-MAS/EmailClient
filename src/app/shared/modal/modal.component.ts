import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() dismiss=new EventEmitter()

  constructor(private elementRef :ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.elementRef.nativeElement)


  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.elementRef.nativeElement.remove();
  }
  onDismissClick(){
    this.dismiss.emit()
  }

}
