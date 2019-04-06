import { Component, EventEmitter, Inject, Input, NgZone, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService, LayoutService, AlertService, LoadingService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';
import { TranslateService } from '@ngx-translate/core';
import { AuctionService } from '@app/service/auction.service';
import { BaseFormComponent } from '@app/class/base-form.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-auction-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class AuctionFormComponent extends BaseFormComponent {
  protected formApiTranslationPrefix = 'auction.form.error';
  protected readonly formSchema = {
    title: ['', [Validators.required, Validators.maxLength(50)]],
    path: ['', [Validators.required, Validators.maxLength(50)]],
  };
  @Input() private successMessage: string;
  @Input() submitCta: string;
  @Input() private submitMethod: string;
  @Input() private submitParams: any[] = [];
  @Input() private model: any = {
    title: '',
    path: '',
  };

  constructor(
    protected zone: NgZone,
    protected formBuilder: FormBuilder,
    private auctionService: AuctionService,
    public layoutService: LayoutService,
    public translateService: TranslateService,
    public alertService: AlertService,
    public loadingService: LoadingService,
  ) {
    super(zone, formBuilder, alertService, layoutService);
    this.createForm();
  }

  init() {
    this.form.patchValue(this.model);
  }

  submit() {
    if (!this.validateForm()) {
      return;
    }

    this.auctionService[this.submitMethod].apply(this.auctionService, [...this.submitParams, {
      title: this.form.value.title,
      path: this.form.value.path,
    }]).pipe(
      catchError(err => this.onError(err)),
      catchError(err => this.layoutService.processApiError(err)),
    ).subscribe(() => this.onSuccess());
  }

  onSuccess() {
    this.alertService.show({ text: this.successMessage, type: 'success' });
    this.layoutService.navigate(['auction']);
  }
}
