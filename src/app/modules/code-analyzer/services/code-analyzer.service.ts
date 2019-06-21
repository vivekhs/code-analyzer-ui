import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CodeAnalysisRequest } from '../model/code-analysis-request';

@Injectable()
export class CodeAnalyzerService {

  baseURL: string = '/api';
  constructor(private http: HttpClient) { }


  uploadCode(uploader: FileUploader, fileName: string, language: string){
    const userId = sessionStorage.getItem('user_id');
    uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.headers = [{ name: 'authorization', value: `Bearer ${sessionStorage.getItem("access_token")}` }];
      item.url = `${this.baseURL}/code/upload_analyse?user_id=${userId}&file_name=${fileName}&language=${language}`
    }
    uploader.queue[0].upload();
    
  }

  analyseCode(codeAnalysisRequest: CodeAnalysisRequest){
    const headers = new HttpHeaders().append('authorization', `Bearer ${sessionStorage.getItem("access_token")}`);
    return this.http.post<any>
    (`${this.baseURL}/code/analyse`, codeAnalysisRequest, {headers});
  }

  

  
}
