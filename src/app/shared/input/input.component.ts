import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input( ) label!:string ;
  @Input() control! :FormControl ;
  @Input() type! :string ;
  @Input() controlType : string  = "input";
  constructor() { }

  ngOnInit(): void {
  }
  showErrors(){
    if( (this.control.touched && this.control.dirty) && this.control.errors){
      return true;
    }
    else {
      return false ;
    }
  }
}
