import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class SessionService {



  constructor() {
  }

  get token() {
    return Cookie.get('token');
  }

  set token(value) {
    Cookie.set('token', value);
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  set user(value) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  removeCookieToken(){
    Cookie.delete('token');
  }

  removeLocalToken(){
    localStorage.removeItem('user')
  }

}
