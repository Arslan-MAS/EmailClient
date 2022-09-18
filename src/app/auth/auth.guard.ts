import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, skipWhile, take } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService : AuthService, private router :Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

   return this.authService.signedIn$.pipe(
      skipWhile((value)=>value===null),
      take(1),
      map((value)=>{
        if (value ){

          return true
        }else {
          this.router.navigateByUrl('/')
          return false
        }
      })
   )
  }

}
