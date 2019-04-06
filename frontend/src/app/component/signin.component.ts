import { Component, Input, NgZone } from '@angular/core';
import { BaseFormComponent } from '@app/class/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AlertService, CustomerService, LayoutService, LoadingService } from '@app/service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends BaseFormComponent {
  isFullHeight = true;
  protected formApiTranslationPrefix = 'singin.form.error';
  protected readonly formSchema = {
    login: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    password: ['', [Validators.required, Validators.maxLength(8), Validators.maxLength(30)]],
  };

  constructor(
    protected zone: NgZone,
    protected formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public alertService: AlertService,
    public loadingService: LoadingService,
    public customerService: CustomerService,
  ) {
    super(zone, formBuilder, alertService, layoutService);
    this.createForm();
  }

  submit() {
    if (!this.validateForm()) {
      return;
    }

    this.customerService.signin({
      login: this.form.value.login,
      password: this.form.value.password,
    }).pipe(
      catchError(err => this.onError(err)),
    ).subscribe(() => this.onSuccess());
  }

  onSuccess() {
    this.alertService.show({ text: 'singin.error.success', type: 'success' });
    this.layoutService.navigate([]);
  }
}
