import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../core/models/product";

@Component({
  selector: 'app-advert-item',
  templateUrl: './advert-item.component.html',
  styleUrls: ['./advert-item.component.scss']
})
export class AdvertItemComponent implements OnInit {

  @Input() productItem: Product;
  constructor() { }

  ngOnInit() {
  }

}
