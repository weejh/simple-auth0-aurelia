import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {tokenIsExpired} from './utils/tokenUtils';

@inject(HttpClient, Router)
export class App {
  message = 'Auth0 - Aurelia';
  // lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN');
  // isAuthenticated = false;
  // username = "user"
  // this.username = JSON.parse(window.localStorage.getItem('profile')).nickname

  // console.log(JSON.parse(window.localStorage.getItem('profile')).nickname)
  // console.log(test);

  lock = new Auth0Lock('NGW5BkUSyZSeAoPy0yC8RJMapLG4aXVT', 'weejh.auth0.com');
  // isAuthenticated = false;

  constructor(http, router) {
    this.http = http;
    this.router = router;
    // this.isAuthenticated = false;



    this.router.configure(config => {
      config.map([
        {
          route: 'public-route',
          name: 'public',
          moduleId: './public-route'
        },
        {
          route: 'private-route',
          name: 'private',
          moduleId: './private-route'
        }
      ])
    });
    this.http.configure(config => {
      config.withDefaults({
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
      });
    });

    localStorage.clear()

    if(tokenIsExpired())  {
      this.isAuthenticated = false;
      // console.log('false');
    }
    else {
      this.isAuthenticated = true;
      // console.log('true');
      // console.log(JSON.parse(window.localStorage.getItem('profile')).nickname)
      // this.username = JSON.parse(window.localStorage.getItem('profile')).nickname

    }

    if (window.localStorage.getItem('profile')) {
      // console.log('got user');
      this.username = JSON.parse(window.localStorage.getItem('profile')).nickname
      this.isAuthenticated = true;


    } else {
      // console.log('no user');
      this.username = 'Lim KoPi'
      this.isAuthenticated = false;

    }

    // this.username = JSON.parse(window.localStorage.getItem('profile')).nickname

    // this.username = JSON.parse(window.localStorage.getItem('profile')).nickname

    // console.log(JSON.parse(window.localStorage.getItem('profile')).nickname)

  }

  login() {
    this.lock.show((err, profile, token) => {
      if(err) {
        console.log(err);
      }
      else {
        // console.log('login');
        // console.log('start in login ' + this.isAuthenticated );
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
      // console.log(JSON.parse(window.localStorage.getItem('profile')).nickname)
      this.username = JSON.parse(window.localStorage.getItem('profile')).nickname

        this.isAuthenticated = true;
      }
    });
  }

  logout() {
    // console.log('logout');
    // console.log('start in logout  ' + this.isAuthenticated );

    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.clear()
    this.isAuthenticated = false;
    this.username = 'Lim KoPi'
  }

  getSecretThing() {
    this.http.fetch('/secured', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('id_token')}`
      }
    })
    .then(response => response.json())
    .then(data => this.secretThing = data.text);
  }

  getDecodedJwt() {
    let jwt = localStorage.getItem('id_token');
    if(jwt) {
      this.decodedJwt = JSON.stringify(jwt_decode(jwt), null, 2);
    }
    else {
      this.decodedJwt = "No JWT Saved";
    }
  }

}
