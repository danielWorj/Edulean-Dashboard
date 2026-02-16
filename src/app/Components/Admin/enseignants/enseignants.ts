import { Component, signal } from '@angular/core';
import { GeneralService } from '../../../Core/Service/General/general-service';
import { UtilisateurService } from '../../../Core/Service/Utlisateur/utilisateur-service';
import { Enseignant } from '../../../Core/Model/Utilisateur/Enseignant/Enseignant';

@Component({
  selector: 'app-enseignants',
  imports: [],
  templateUrl: './enseignants.html',
  styleUrl: './enseignants.css',
})
export class EnseignantsComponent {
  constructor(private generalService : GeneralService, private utilisateurService: UtilisateurService) {
    this.loadPage(); 
  }

  loadPage(){
    this.getAllEnseignants();
  }

  listEnseignants = signal<Enseignant[]>([]); 

  getAllEnseignants(){
    this.utilisateurService.findAllEnseignants().subscribe(
      (response: Enseignant[]) => {
        this.listEnseignants.set(response);
      },
      (error) => {
        console.error('Error fetching enseignants:', error);
      }
    );
  }

}
