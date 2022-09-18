import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedIn = false
  signedIn$: BehaviorSubject<boolean|null>;
  constructor(private authService : AuthService){
    this.signedIn$=this.authService.signedIn$

  }
  ngOnInit(): void {

    //Called after t'he constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.checkAuth().subscribe(()=>{

    })
    this.authService.signedIn$.subscribe((value)=>{
        this.signedIn=value!

    })
  }

}

