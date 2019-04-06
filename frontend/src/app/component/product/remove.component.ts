import { Component } from '@angular/core';
import { BaseComponent } from '@app/class/base.component';
import { Product } from '@app/interface';
import { ActivatedRoute } from '@angular/router';
import { AlertService, LayoutService, LoadingService } from '@app/service';
import { catchError, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from '@app/service/product.service';
import { select, Store } from '@ngrx/store';
import { selectProductOne } from '@app/selector/product.selector';

@Component({
  selector: 'app-product-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
})
export class ProductRemoveComponent extends BaseComponent {
  auctionId: string;
  product$: Observable<Product>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public loadingService: LoadingService,
    public layoutService: LayoutService,
    public alertService: AlertService,
    private store: Store<{ productOne: Product }>,
  ) {
    super();
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

    this.activatedRoute.params
      .pipe(
        first(),
        map(params => params.productId),
      )
      .subscribe((productId) => {
        this.productService.fetchOne(productId).pipe(
          catchError((err) => {
            this.layoutService.navigate(['auction', this.auctionId, 'product']);
            return this.layoutService.processApiError(err);
          }),
        ).subscribe();
        this.product$ = this.store.pipe(select(selectProductOne, { productId }));
      });
  }

  remove(product: Product) {
    this.productService.remove(product).pipe(
      catchError(err => this.layoutService.processApiError(err)),
    ).subscribe(() => this.onSuccess());
  }

  onSuccess() {
    this.alertService.show({ text: 'product.remove.error.success', type: 'success' });
    this.layoutService.navigate(['auction', this.auctionId, 'product']);
  }
}
