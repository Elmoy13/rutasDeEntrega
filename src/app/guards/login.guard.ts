import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  token: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token) {
      this.router.navigate(['listas']);
      return false;
    }
      // this.router.navigate(['login']);
    return true;
  }
  
}
