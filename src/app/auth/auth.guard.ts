import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth)
          return true;
        // если пользователь не зашел сразу переносит на страничку вкода
        return this.router.createUrlTree(['/auth']);
      }),
      /*tap(isAuthenticated => {
        if (!isAuthenticated)
          this.router.navigate(['/auth']);
      })*/
    );
  }
}
