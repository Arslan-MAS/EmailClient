import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm =new FormGroup({
    username :new FormControl('', [
      Validators.required,
      Validators.minLength(3) ,
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],

      ),



    password :new FormControl('' ,[
      Validators.required,
      Validators.minLength(4) ,
      Validators.maxLength(20),
    ]),

  })
  constructor(private authService :AuthService , private router :Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.signInForm.invalid){
      return
    }
    this.authService.signIn(this.signInForm.value).subscribe((value)=>{
        this.router.navigateByUrl('/inbox')

    },
    error=>{
      if (error.error.username || error.error.password){

        this.signInForm.setErrors({
          credentails:true
        })
      }
    }

    )

  }
  showError(){
    if (this.signInForm.errors){
      return true
    }else {
      return false
    }
  }
  passwordError(){

    if (this.signInForm.errors!['credentails'] ){
      return true
    }else {
      return false
    }
  }

}
