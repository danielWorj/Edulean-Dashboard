import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from "./Components/auth/auth";
import { Dashboard } from "./Components/Parents/dashboard/dashboard";
import { Sidebar } from "./Layout/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth, Dashboard, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dashboard');

  //isConnected:boolean = true; //En test
  isConnected:boolean = true; //En test
  
  
  roleParent : number = 0; 

  changeIsConnected(e:any){
    this.isConnected=(e); 
    //console.log('is connected value :', this.isConnected); 

    this.roleParent = parseInt(sessionStorage.getItem("role")!); 

    console.log('le role est :', sessionStorage.getItem("role")!);
    
  }


  

}
