export class Owner {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  location: string;
  color_scheme: string;
  language: string;
}

export class Image {
  pk: number;
  advert: number;
  file: string;
}

export class Product {
  id: number;
  owner: Owner;
  images: Image[];
  theme: string;
  price: number;
  currency: number;
  text: string;
  contractPrice: boolean;
  location: string;
  category: string;
  activated_at: string;
  isActive: boolean


  constructor(json: any) {
    this.id = json.pk;
    this.owner = json.owner;
    this.price = json.price;
    this.text = json.text;
    this.currency = json.currency;
    this.contractPrice = json.contract_price;
    this.theme = json.theme;
    this.images = json.images;
    this.location = json.location;
    this.category = json.category;
    this.activated_at = json.activated_at;
    this.isActive = json.is_active;
  }
}
