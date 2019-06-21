import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInCredentials } from '../model/sign-in-credentials';
import { SignInResponse } from '../model/sign-in-response';
import { Observable } from 'rxjs';
import { SignUpInfo } from '../model/sign-up-info';

@Injectable()
export class AuthenticationService {

  baseURL: string = '/api';
  constructor(private http: HttpClient) { }

  signIn(signInCreds: SignInCredentials): Observable<SignInResponse> {
    return this.http.post<SignInResponse>
    (`${this.baseURL}/auth/sign_in`, signInCreds);
  }

  signUp(signInCreds: SignUpInfo): Observable<string> {
    return this.http.post<string>
    (`${this.baseURL}/auth/sign_up`, signInCreds);
  }

  

  
}
