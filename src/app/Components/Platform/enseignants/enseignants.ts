import { Component, signal } from '@angular/core';
import { GeneralService } from '../../../Core/Service/General/general-service';
import { UtilisateurService } from '../../../Core/Service/Utlisateur/utilisateur-service';
import { Section } from '../../../Core/Model/Academie/Section';
import { ProfilEnseignant } from '../../../Core/Model/Utilisateur/Enseignant/ProfilEnseignant';
import { StatusEnseignant } from '../../../Core/Model/Utilisateur/Enseignant/StatusEnseignant';
import { Enseignant } from '../../../Core/Model/Utilisateur/Enseignant/Enseignant';

@Component({
  selector: 'app-enseignants',
  imports: [],
  templateUrl: './enseignants.html',
  styleUrl: './enseignants.css',
})
export class EnseignantsPlatform {
  voirProfil = signal<boolean>(false); 

  constructor(private generalService :GeneralService , private utilisateurService : UtilisateurService){
     this.getAllSections();
     this.getAllProfilEnseignant();
     this.getAllEnseignants();

     this.voirProfil.set(false); 
     
  }

  listSections = signal<Section[]>([]);
  getAllSections(){
    this.generalService.findAllSections().subscribe({
      next: (response:Section[]) => {
        this.listSections.set(response);
      },
      error: (error) => {
        console.error('Error fetching sections : failed');
      }
    });
  }

  findEnseignantByDiplome(ID:any){
    let id = ID.target.value;

  }

  findEnseignantByProfilEnseignant(ID:any){
    let id = ID.target.value;

  }

  findEnseignantBySection(ID:any){
    let id = ID.target.value;

  }

  listProfilEnseignant = signal<ProfilEnseignant[]>([]);
  getAllProfilEnseignant(){
    this.generalService.findAllProfilEnseignants().subscribe({
      next: (response:ProfilEnseignant[]) => {
        this.listProfilEnseignant.set(response);
      },
      error: (error) => {
        console.error('Error fetching list professions : failed');
      }
    });
  }

  listStatusEnseignant = signal<StatusEnseignant[]>([]);

  getAllStatusEnseignant(){
    this.generalService.findAllStatusEnseignants().subscribe({
      next: (response:StatusEnseignant[]) => {
        this.listStatusEnseignant.set(response);
      },
      error: (error) => {
        console.error('Error fetching status enseignant : failed');
      } 
    });
  }

  listEnseignants = signal<Enseignant[]>([]);

  getAllEnseignants(){
    this.utilisateurService.findAllEnseignants().subscribe({
      next: (response:Enseignant[]) => {
        this.listEnseignants.set(response);
      },
      error: (error) => {
        console.error('Error fetching enseignants : failed');
      } 
    }); 
  }

  getEnseignantsBySection(idSection:number){
    this.utilisateurService.findAllEnseignantsBySection(idSection).subscribe({
      next: (response:Enseignant[]) => {
        this.listEnseignants.set(response);
      },
      error: (error) => {
        console.error('Error fetching enseignants by section : failed');
      } 
    }); 
  }

  getEnseignantsByStatus(status:string){
    this.utilisateurService.findAllEnseignantsByStatus(status).subscribe({
      next: (response:Enseignant[]) => {
        this.listEnseignants.set(response); 
      },
      error: (error) => {
        console.error('Error fetching enseignants by status : failed');
      } 
    }); 
  }

  getEnseignantsByProfil(idProfil:number){  
    this.utilisateurService.findAllEnseignantsByProfil(idProfil).subscribe({
      next: (response:Enseignant[]) => {
        this.listEnseignants.set(response);   
      },
      error: (error) => {
        console.error('Error fetching enseignants by profil : failed');
      } 
    });
  }

  enseignantSelected = signal<Enseignant | undefined>(undefined); 
  seeDetailsEnseignant(e:Enseignant){
    this.voirProfil.set(true); 
    this.enseignantSelected.set(e);  
  }

  findEnseignantById(id : number){

    this.utilisateurService.findEnseignantById(id).subscribe({
      next:(data : Enseignant)=>{
        this.voirProfil.set(true); 
        this.enseignantSelected.set(data);
      }, 
      error:()=>{
        console.log('Enseignant find by id : failed'); 
      }
    })
  }

  killVoirProfil(){
    this.voirProfil.set(false);
  }
}
