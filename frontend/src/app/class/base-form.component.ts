import { NgZone } from '@angular/core';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseComponent } from '@app/class/base.component';
import { AlertService, LayoutService } from '@app/service';

export class BaseFormComponent extends BaseComponent {
  protected formSchema: any;
  protected formTranslationPrefix = 'form.error';
  protected formApiTranslationPrefix = 'form.error';
  public form: FormGroup;
  public formErrors: any = {};

  constructor(
    protected zone: NgZone,
    protected formBuilder: FormBuilder,
    protected alertService: AlertService,
    public layoutService: LayoutService,
  ) {
    super();
  }

  createForm() {
    this.formErrors = Object.keys(this.formSchema)
      .reduce((value, key) => ({ ...value, [key]: '' }), {});
    this.form = this.formBuilder.group(this.formSchema);

    this.subscriptions.push(
      this.form.valueChanges
        .subscribe(() => this.onValueChanged()),
    );

    this.onValueChanged();
  }

  onValueChanged() {
    if (!this.form) {
      return;
    }

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        for (const key of Object.keys(control.errors)) {
          let metaErr = control.errors[key] || {};
          let keyErr = key;

          if (typeof metaErr === 'string') {
            keyErr = metaErr;
            metaErr = {};
          }

          this.formErrors[field] = {
            text: `${this.formTranslationPrefix}.${keyErr}`,
            meta: metaErr,
          };

          break;
        }
      }
    }
  }

  onError(err) {
    const errors = err && (err.graphQLErrors || err.errors);
    if (errors
      && errors.length
      && errors[0].extensions
      && errors[0].extensions.exception
      && errors[0].extensions.exception
      && errors[0].extensions.exception.form
    ) {
      const form = errors[0].extensions.exception.form;
      const customErrors = [];
      Object.keys(form).forEach((field) => {
        const text = `${this.formApiTranslationPrefix}.${field}.${form[field]}`;

        if (this.formErrors[field] === undefined) {
          customErrors.push(text);
        } else {
          this.formErrors[field] = {
            text,
          };
        }
      });

      if (customErrors.length) {
        customErrors.forEach(text => this.alertService.show({ text }));
      }

      return throwError(err);
    }

    return this.layoutService.processApiError(err);
  }

  validateForm() {
    if (this.form.valid) {
      return true;
    }

    this.zone.run(() => {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[key].markAsDirty();
      }

      this.onValueChanged();
    });

    return false;
  }
}
