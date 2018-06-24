import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class SessionService {


  constructor() { }

  get token() {
    return Cookie.get('token');
  }

  set token(value) {
    Cookie.set('token', value);
  }

  get user() {
    return JSON.parse(localStorage.getItem('token'));
  }

  set user(value) {
    localStorage.setItem('token', JSON.stringify(value));
  }


}
