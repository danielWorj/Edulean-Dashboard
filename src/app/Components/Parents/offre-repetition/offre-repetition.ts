import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RepetitionService } from '../../../Core/Service/Repetition/repetition-service';
import { OffreRepetitionM } from '../../../Core/Model/Repetition/OffreRepetition'
import { Eleve } from '../../../Core/Model/Utilisateur/Eleve/Eleve';
import { UtilisateurService } from '../../../Core/Service/Utlisateur/utilisateur-service';
import { ResponseServer } from '../../../Core/Model/Server/ResponseServer';
import { Enseignant } from '../../../Core/Model/Utilisateur/Enseignant/Enseignant';

@Component({
  selector: 'app-offre-repetition',
  imports: [ReactiveFormsModule],
  templateUrl: './offre-repetition.html',
  styleUrl: './offre-repetition.css',
})
export class OffreRepetition {
  idParent = signal<number>(0); //test id == 3
  offreRepitionForm !: FormGroup; 
  constructor(private fb : FormBuilder, private repetitionService : RepetitionService , private utilisateurService : UtilisateurService){
     this.offreRepitionForm = this.fb.group({
      id: new FormControl(),
      intitule: new FormControl(),
      bio: new FormControl(),
      salaireMin: new FormControl(),
      salaireMax: new FormControl(),
      frequence: new FormControl(),
      dateCreation: new FormControl(),
      duree: new FormControl(),
      eleve: new FormControl(),
    });

    //this.idParent.set(3); 
    this.idParent.set(parseInt(sessionStorage.getItem("id")!));
    console.log("Parent Id : ", this.idParent());
    this.loadPage();
  }

  loadPage(){
    this.getAllOffre(); 
    this.getAllEleve(); 
  }
  listOffreRepetitionByParent = signal<OffreRepetitionM[]>([]); 

  getAllOffre(){
     this.repetitionService.findOffreRepetitionByParentId(this.idParent()).subscribe({
          next : (data : OffreRepetitionM[])=>{
            this.listOffreRepetitionByParent.set(data); 
          }, 
          error : ()=>{
            console.log('Fecth list eleve : failed'); 
          }
        }); 
      
  }


  listEnfant = signal<Eleve[]>([]); 
  getAllEleve(){
     this.utilisateurService.findAllEleveByParent(this.idParent()).subscribe({
          next : (data : Eleve[])=>{
            this.listEnfant.set(data); 
          }, 
          error : ()=>{
            console.log('Fecth list eleve : failed'); 
          }
        }); 
  }


  voirOffre(o:OffreRepetitionM){
    this.offreRepitionForm.controls['id'].setValue(o.id);
    this.offreRepitionForm.controls['intitule'].setValue(o.intitule);
    this.offreRepitionForm.controls['bio'].setValue(o.bio);
    this.offreRepitionForm.controls['salaireMin'].setValue(o.salaireMin);
    this.offreRepitionForm.controls['salaireMax'].setValue(o.salaireMax);
    this.offreRepitionForm.controls['dateCreation'].setValue(o.dateCreation);
    this.offreRepitionForm.controls['frequence'].setValue(o.frequence);
    this.offreRepitionForm.controls['duree'].setValue(o.duree);
    this.offreRepitionForm.controls['eleve'].setValue(o.eleve.id);
    
  }

  isCreation = signal<boolean>(false); 
  toggleToCreation(){
    this.isCreation.set(true); 
  }

  toggleToEdit(){
    this.isCreation.set(false); 
  }


  createOffreRepetition() {
    if (this.isCreation()) {
      let formData: FormData = new FormData();
      formData.append('offrerepetition', JSON.stringify(this.offreRepitionForm.value));

      this.repetitionService.createOffreRepetition(formData).subscribe({
        next: (response: Enseignant[]) => {
          if (response.length!=0) {
            alert('Offre Repetition created successfully'); 
            this.loadPage(); 
            this.offreRepitionForm.reset(); 
            this.isCreation.set(false); 
          }
        },
        error: (error) => {
          console.error("Error creating Offre Repetition", error);
        }
      });
    }
    if (!this.isCreation()) {
      //Edit data 
      let formData: FormData = new FormData();
      formData.append('offrerepetition', JSON.stringify(this.offreRepitionForm.value));

      this.repetitionService.updateOffreRepetition(formData).subscribe({
        next: (response: ResponseServer) => {
          if (response.status) {
            alert("Offre Repetition updated successfully");
            this.loadPage(); 
            this.offreRepitionForm.reset(); 
            this.isCreation.set(false); 
          }
        },
        error: (error) => {
          console.error("Error creating Offre Repetition", error);
        }
      });
    }
  }

  deleteOffre(o:OffreRepetitionM){
    // this.repetitionService.updateOffreRepetition(o.id).subscribe({
    //   next:()=>{
    //       this.loadPage(); 
    //     console.log('Delete offre successfully'); 
    //   }, 
    //   error : ()=>{
    //     console.log('Delete offre : failed'); 
    //   }
    // }); 
  }

}
