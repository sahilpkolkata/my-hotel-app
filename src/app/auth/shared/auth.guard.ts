import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthGuard implements CanActivate {
    private url: string;

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrManager) {}

  private handleAuthState():boolean{
    if(this.isLoginOrRegister()){
        this.toastr.warningToastr('Are you lost somewhere??', 'Oops!',{
            animate: 'slideFromTop',
            showCloseButton: true
        });
        this.router.navigate(['/rentals'])
        return false
    }
    return true
  }

  private handleNotAuthState():boolean{
      if(this.isLoginOrRegister()){
          return true
      }
      this.toastr.infoToastr('You need to login first!', 'Info',{
        showCloseButton: true,
        toastTimeout: 1000

      });
      this.router.navigate(['/login'])
      return false

  }

  private isLoginOrRegister():boolean{
      if(this.url.includes('login') || this.url.includes('register')){
          return true
      }
      return false
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url

    if(this.auth.isAuthenticated()){
        
        return this.handleAuthState()
    }
    return this.handleNotAuthState()
 }
}