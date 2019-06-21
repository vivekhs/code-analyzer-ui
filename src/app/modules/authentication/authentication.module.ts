import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { authenticationRoutes } from './authentication.routing';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
    declarations: [SignUpComponent, SignInComponent],
    imports: [
        RouterModule.forChild(authenticationRoutes),
        SharedModule,
        NgbModule
    ],
    exports: [],
    providers: [AuthenticationService]
})
export class AuthenticationModule {

}
