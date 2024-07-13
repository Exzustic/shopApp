import {Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseDate, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",

})
export class AuthComponent implements OnDestroy{
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid)
      return;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseDate>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      response => {
        this.error = null;
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  private showErrorAlert(errorMessage: string) {
    //const alertCmp = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = errorMessage;
    this.closeSubscription = componentRef.instance.close.subscribe(
      () => {
        this.closeSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
}
