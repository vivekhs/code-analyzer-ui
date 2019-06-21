import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../../model/sign-up-info';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpInfo: SignUpInfo;
  constructor(
    private commonService: SharedService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.signUpInfo = new SignUpInfo();
  }

  signUp(){
    this.commonService.showSpinner();
    this.authService.signUp(this.signUpInfo)
      .subscribe(response=>{
        this.commonService.hideSpinner();
          this.signIn();
      }, error => {
        console.log(error)
        this.commonService.hideSpinner();
        alert('Something went wrong');
      })
  }

  signIn(){
    this.router.navigate(["../sign_in"], { relativeTo : this.route});
  }
}
