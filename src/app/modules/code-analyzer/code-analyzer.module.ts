import { NgModule } from "@angular/core";
import { CodeAnalyzerService } from './services/code-analyzer.service';
import { RouterModule } from '@angular/router';
import { codeAnalyzerRoutes } from './code-analyzer.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeAnalyzerComponent } from './components/code-analyzer/code-analyzer.component';
import { ReportViewerComponent } from './components/report-viewer/report-viewer.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [ CodeAnalyzerComponent, ReportViewerComponent],
    imports: [
        RouterModule.forChild(codeAnalyzerRoutes),
        SharedModule,
        NgbModule,
        MonacoEditorModule,
        FileUploadModule
    ],
    exports: [],
    providers: [CodeAnalyzerService]
})
export class CodeAnalyzerModule {

}
