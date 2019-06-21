import { Component, OnInit } from '@angular/core';
import { DropdownProperty } from '../../model/dropdown-property';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { CodeAnalyzerService } from '../../services/code-analyzer.service';
import { AnalysisReport } from '../../model/analysis-report';
import { CodeAnalysisRequest } from '../../model/code-analysis-request';
import { CodeAnalysisTransaction } from '../../model/code-analysis-transaction.model';
import { SharedService } from '../../../../shared/services/shared.service';
@Component({
  selector: 'app-code-analyzer',
  templateUrl: './code-analyzer.component.html',
  styleUrls: ['./code-analyzer.component.scss']
})
export class CodeAnalyzerComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'java'};
  supportedLanguages: DropdownProperty[];
  selectedLanguage: string;
  code: string;
  modes: DropdownProperty[];
  selectedMode: string;
  fileName: string;
  analysisReports: AnalysisReport[];
  public uploader:FileUploader = new FileUploader({});
  constructor(private codeAnalyzerService: CodeAnalyzerService,
      private commonService: SharedService) {
    
   }

  ngOnInit() {
    this.supportedLanguages = [
      {
          value:"JAVA",
          description: "Java"
      },
      {
          value:"C",
          description: "C"
      }
    ];
  

  this.modes = [
    {
        value:"CODE_EDITOR",
        description: "Code Editor"
    },
    {
        value:"CODE_UPLOADER",
        description: "Code Uploader"
    }
  ];

  this.uploader.response.subscribe(response=>{
    response = JSON.parse(response);
    this.analysisResponseHandler(response);
  })
}

  analyseCode(){
    switch(this.selectedMode){
      case 'CODE_EDITOR': 
        const codeAnalysisRequest = new CodeAnalysisRequest();
        codeAnalysisRequest.fileName = `${this.fileName}.${this.selectedLanguage.toLowerCase()}`;
        codeAnalysisRequest.content = this.code;
        codeAnalysisRequest.userName = sessionStorage.getItem('user_id');
        codeAnalysisRequest.language = this.selectedLanguage;
        this.commonService.showSpinner();
        this.codeAnalyzerService.analyseCode(codeAnalysisRequest)
          .subscribe(response => {
            this.analysisResponseHandler(response);
          },
          error => {
            this.commonService.hideSpinner();
            this.analysisReports = [];
            alert('Something went wrong');
          })
        break;
      case 'CODE_UPLOADER':
          this.commonService.showSpinner();
          this.fileName = this.uploader.queue[0]._file.name;
          this.selectedLanguage = this.getLanguageByFileName(this.fileName);
          this.codeAnalyzerService.uploadCode(this.uploader, this.fileName, this.selectedLanguage);
            
        break; 
    }

  }

  getLanguageByFileName(fileName: string){
      const parts = fileName.split('.');
      const fileExt = parts[parts.length-1].toUpperCase();
      return fileExt;
  }

  analysisResponseHandler(response){
    this.commonService.hideSpinner();
    if(!response.error){
      this.analysisReports = response.data.analysisReport;
      
    }
    else{
      this.analysisReports = [];
      alert('Something went wrong');
    }
  }

  reset(){
    this.analysisReports = [];
  }

}
