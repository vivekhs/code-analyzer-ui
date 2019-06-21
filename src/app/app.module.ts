import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
    {
        path: 'code_analyzer',
        loadChildren: './modules/code-analyzer/code-analyzer.module#CodeAnalyzerModule',
       // canActivate: [AuthGuard],
    },
    {
        path: '',
        loadChildren: './modules/authentication/authentication.module#AuthenticationModule',
    },
    {
        path: "**",
        redirectTo: '/'
    }
];




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        MonacoEditorModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    providers: [
        AuthGuard
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
