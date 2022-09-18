import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms'
import { Observable, of, } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn:'root'
})
export class UsernameValidator implements AsyncValidator{

  constructor(private authService :AuthService) {

  }
  validate=(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> =>{

    return this.authService.userExists(control.value).pipe(
      (map(value=>{
        if (value.available){
          return null
        }
        return value;

      })),
      (catchError((error)=>{
        if (error.error.username){

          return of ({nonUniqueUsername:true})
        }else {
          return of ({noConnection:true})
        }
      }))
    )

  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
