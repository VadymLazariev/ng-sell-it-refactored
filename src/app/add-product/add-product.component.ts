import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductDataService} from "../core/product-data.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  ngOnInit(): void {
  }

  public addingProductForm: FormGroup;
  public images;

  constructor(private fb: FormBuilder, private  poductService: ProductDataService) {
    this.createForm();
  }

  createForm() {
    this.addingProductForm = this.fb.group({
      theme: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')
        , Validators.maxLength(20)
        , Validators.minLength(5)],)],
      text: ['', Validators.compose([Validators.required, Validators.minLength(5)],)],
      price: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]+$')])],
      currency: ['', Validators.required],
      contract_price: ['',],
      location: ['', Validators.required],
      is_active: ['',],
      images: [[],]
    });
  }

  onSubmit() {
    this.poductService.createProduct(this.addingProductForm.value, this.images).pipe().subscribe(data => {
      console.log(data);
    });
  }

  onChange(e) {
    this.images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[i]);
      fileReader.onload = () => {
        console.log(fileReader.result);
        this.images.push(fileReader.result);
      };
    }


  }

}
