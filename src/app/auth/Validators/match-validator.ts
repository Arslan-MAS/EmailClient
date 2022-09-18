import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root'
})
export class MatchValidator implements Validator{
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const {password, passwordConfirmation} = control.value
    if (password!=passwordConfirmation){
      return {
        passwordMatch :'Password don\'t match'
      }
    }
    return null

  }


}
