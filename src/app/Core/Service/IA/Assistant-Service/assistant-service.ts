import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { edulearnDashboard } from '../../../Constant/EndPoints';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  constructor(private http:HttpClient){}

  findAssistance():Observable<any>{
    return this.http.get(
      'http://localhost:8080/edulearn/api/ia/assistant', { 
      responseType: 'text' 
    }); 
  }

  findAssistanceTextuelle(prompt :any):Observable<any>{
     return this.http.post(
      'http://localhost:8080/edulearn/api/ia/assistant-textuel',
      prompt
      ,{ 
      responseType: 'text' 
    });
  }
  
}
