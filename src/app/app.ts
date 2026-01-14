import { Component, signal } from '@angular/core';
import { RouterOutlet , RouterLink } from '@angular/router';
import { Auth } from "./Components/auth/auth";
import { Sidebar } from "./Layout/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dashboard');

  isConnected:boolean = true; //En test
  //isConnected:boolean = false; //En Prod
  
  
  role : number = 0; 

  changeIsConnected(e:any){
    this.isConnected=(e); 
    //console.log('is connected value :', this.isConnected); 

    this.role = parseInt(sessionStorage.getItem("role")!); 

    console.log('le role est :', sessionStorage.getItem("role")!);
    
  }

  
  showSection(sectionId: string, event?: Event): void {
    // Cache toutes les sections
    const sections = document.querySelectorAll('main > div');
    sections.forEach(div => div.classList.add('section-hidden'));
    
    // Affiche la section sélectionnée
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
      targetSection.classList.remove('section-hidden');
    }
    
    // Gère la classe active sur les éléments de navigation
    if (event) {
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => item.classList.remove('active'));
      (event.currentTarget as HTMLElement).classList.add('active');
    }

    // ✅ FERMER LE SIDEBAR APRÈS SÉLECTION (en mobile)
    if (window.innerWidth <= 768) {
      this.closeSidebar();
    }
  }

  // ✅ MÉTHODE POUR OUVRIR/FERMER LE SIDEBAR (toggle)
  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
      const isActive = sidebar.classList.contains('active');
      
      if (isActive) {
        // Fermer
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
      } else {
        // Ouvrir
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Désactiver le scroll
      }
    }
  }

  // ✅ MÉTHODE POUR FERMER LE SIDEBAR (explicitement)
  closeSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Réactiver le scroll
    }
  }


  

}
