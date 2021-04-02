import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute  
    
  ) { }

  ngOnInit(): void {
    //coleta o ID para utilizar como parâmetro
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id = `${this.product.id}`;
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto escluído com sucesso!");
      this.router.navigate(['/products']);
    })
  }

  cancel(){
    this.router.navigate(['/products'])
  }

}
