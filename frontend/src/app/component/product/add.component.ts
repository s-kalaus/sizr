import { Component, HostBinding, NgZone } from '@angular/core';

import { AlertService, LayoutService, LoadingService } from '@app/service';
import { BaseFormComponent } from '@app/class/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, first, map } from 'rxjs/operators';
import { ProductService } from '@app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class ProductAddComponent extends BaseFormComponent {
  auctionId: string;
  protected formApiTranslationPrefix = 'product.form.error';
  protected readonly formSchema = {
    oid: ['', [Validators.required, Validators.maxLength(50)]],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    protected zone: NgZone,
    protected formBuilder: FormBuilder,
    public alertService: AlertService,
    public loadingService: LoadingService,
    public layoutService: LayoutService,
    public productService: ProductService,
  ) {
    super(zone, formBuilder, alertService, layoutService);
    this.createForm();
  }

  init() {
    this.activatedRoute.parent.params
      .pipe(
        first(),
        map(params => params.auctionId),
      )
      .subscribe((auctionId) => {
        this.auctionId = auctionId;
      });
  }

  submit() {
    if (!this.validateForm()) {
      return;
    }

    this.productService.add({
      auctionId: this.auctionId,
      oid: this.form.value.oid,
    }).pipe(
      catchError(err => this.onError(err)),
    ).subscribe(() => this.onSuccess());
  }

  onSuccess() {
    this.alertService.show({ text: 'product.add.error.success', type: 'success' });
    this.layoutService.navigate(['auction', this.auctionId, 'product']);
  }
}
