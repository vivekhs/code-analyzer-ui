import { Routes } from "@angular/router";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authenticationRoutes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/sign_in',
    },
    {
        path: 'sign_in', component: SignInComponent
    },
    {
        path: 'sign_up', component: SignUpComponent
    }
];