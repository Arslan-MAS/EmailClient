import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchValidator } from '../Validators/match-validator';
import { UsernameValidator } from '../Validators/username-validator';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup = new FormGroup(
    {
      username :new FormControl('', [
        Validators.required,
        Validators.minLength(3) ,
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)],
        [
          this.usernameValidator.validate
        ]

        ),



      password :new FormControl('' ,[
        Validators.required,
        Validators.minLength(4) ,
        Validators.maxLength(20),
      ]),

      passwordConfirmation :new FormControl('',[
        Validators.required,
        Validators.minLength(4) ,
        Validators.maxLength(20),
      ]),
    }
    ,{
      validators:[this.matchPassword.validate]
    }

  );
  constructor(private matchPassword :MatchValidator, private usernameValidator: UsernameValidator, private authService:AuthService , private router :Router) { }


  ngOnInit(): void {

  }
  showError(){
    if (this.signUpForm.get('passwordConfirmation')!.touched&&this.signUpForm.get('password')!.touched &&this.signUpForm.dirty&&this.signUpForm.errors){
      return true
    }
    else {
      return false
    }
  }
  passwordMatchError(){
    if (this.signUpForm.get('passwordConfirmation')?.touched&&this.signUpForm.get('password')?.dirty && this.signUpForm.errors!['passwordMatch']){
      return true;
    } else {
      return false ;
    }
  }
  onSubmit(){
    if (this.signUpForm.invalid){
      return ;
    }
    else {
      console.log(this.signUpForm.value)
      this.authService.signUp(this.signUpForm.value).subscribe(
        (value)=>{
          this.router.navigateByUrl('/inbox');

      },
        (error)=>{
          if (!error.status){// check if network is connected
            this.signUpForm.setErrors({
              noConnection:true
            })

          }
        }
      )

    }
  }

}
