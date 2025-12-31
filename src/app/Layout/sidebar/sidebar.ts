import { Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  //Ce role provient du parent 
  role : number = 0; 

  constructor(){
    this.getRole(); //En test
  }

  getRole(){
    this.role = parseInt(sessionStorage.getItem("role")!); 

    console.log('le role est :', this.role);
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
  }

  toggleSidebar(): void {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      
      if (sidebar) {
        sidebar.classList.toggle('active');
      }
      if (overlay) {
        overlay.classList.toggle('active');
      }
    }
  }
}
