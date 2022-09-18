import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UserAvailableResponse{
  available:boolean

}
interface Credentials{
  username : string ;
  password :string ;
  passwordConfirmation :string}
interface SignupResponse {
  username:string
}

interface SigninCredentials{
  username : string ;
  password : string ;
}
interface SigninResponse {
  username:string
}
interface SignedinResponse {

    authenticated:boolean;
    username :string ;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName? : string ;
  signedIn$:BehaviorSubject<boolean|null> =new  BehaviorSubject<boolean|null>(null);
  apiUrl = 'https://api.angular-email.com';

  constructor(private http:HttpClient) { }

  userExists ( username :string){
    return this.http.post<UserAvailableResponse>(this.apiUrl+'/auth/username',{
      username

   })

  }
  signUp(credentials :Credentials){
    return this.http.post<SignupResponse>(this.apiUrl+'/auth/signup',
     credentials,
    //  {
    //   withCredentials:true
    //  }
    ).pipe(
      (tap((value)=>{
        this.signedIn$.next(true);
        this.userName = value.username
      }))
    )

  }
  checkAuth (){
    return this.http.get<SignedinResponse>(this.apiUrl+"/auth/signedin",
    // {
    //   withCredentials:true
    // }
    ).pipe(tap(value=>{
      this.signedIn$.next(value.authenticated)
      console.log(value)

      this.userName = value.username
    }))
  }
  signOut(){
    return this.http.post(this.apiUrl+'/auth/signout',{

    }).pipe(
      tap(value=>{
        console.log(value)
        this.signedIn$.next(false)

        this.userName = undefined
      })
    )
  }
  signIn(credentials :any){
    return this.http.post<SigninResponse>(this.apiUrl+'/auth/signin',
     credentials,
    //  {
    //   withCredentials:true
    //  }
    ).pipe(
      (tap((value)=>{
        console.log(value)
        this.signedIn$.next(true);

        this.userName = value.username

      }))
    )

  }
}
