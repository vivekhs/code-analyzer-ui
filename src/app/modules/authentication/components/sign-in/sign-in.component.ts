import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { SignInCredentials } from '../../model/sign-in-credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInCreds: SignInCredentials;
  constructor(private commonService: SharedService,
     private authService: AuthenticationService,
     private router: Router,
     private route: ActivatedRoute) {
      this.signInCreds = new SignInCredentials();
   }

  ngOnInit() {
  }

  signUp(){
    this.router.navigate(['../sign_up'], { relativeTo: this.route });
  }
  signIn(){
    this.commonService.showSpinner();
    this.authService.signIn(this.signInCreds)
      .subscribe(response => {
        this.commonService.hideSpinner();
        if(!response['error']){
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("user_id", this.signInCreds.userId);
          this.router.navigate(["/code_analyzer"]);
        }
        else{
          alert("Username or password is invalid");
        }
      }, error => {
        this.commonService.hideSpinner();
        alert("Something went wrong");
      })
  }
}
