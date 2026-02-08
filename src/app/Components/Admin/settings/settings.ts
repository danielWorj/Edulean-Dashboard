import { Component, signal } from '@angular/core';
import { GeneralService } from '../../../Core/Service/General/general-service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Section } from '../../../Core/Model/Academie/Section';
import { ResponseServer } from '../../../Core/Model/Server/ResponseServer';
import { Niveau } from '../../../Core/Model/Academie/Niveau';
import { Diplome } from '../../../Core/Model/Utilisateur/Enseignant/Diplome';
import { CategorieMatiere } from '../../../Core/Model/Academie/CategorieMatiere';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  sectionFb!: FormGroup; 
  niveauFb!:FormGroup; 
  diplomeFB! : FormGroup; 
  categorieMatiereFb! : FormGroup; 

  
  constructor(private fb : FormBuilder , private generalService : GeneralService){
    this.sectionFb = this.fb.group({
      id : new FormControl(),
      intitule : new FormControl()
    }); 

    this.niveauFb = this.fb.group({
      id : new FormControl(), 
      intitule : new FormControl(), 
      section : new FormControl(), 
    }); 

    this.diplomeFB = this.fb.group({
      id : new FormControl(), 
      intitule : new FormControl(),
    }); 

    this.categorieMatiereFb = this.fb.group({
      id : new FormControl(),
      intitule : new FormControl(),
      section : new FormControl(),
    })
  }

  //Section
  listSection = signal<Section[]>([]); 
  getAllSection(){
    this.generalService.findAllSections().subscribe({
      next:(data :Section[])=>{
        this.listSection.set(data); 
      }, 
      error : ()=>{
        console.log('fetch list section : failed');
      }
    }); 
  }

  createSection(){
    const formData = new FormData(); 
   
    formData.append("section", JSON.stringify(this.sectionFb.value)); 
    console.log('data section:', this.sectionFb.value); 

    this.generalService.createSection(formData).subscribe({
      next:(data : ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error :()=>{
        console.log('creation section : failed'); 
      }
    });
  }


  deleteSection(id:any){
    this.generalService.deleteSection(id).subscribe({
      next:(data :ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error : ()=>{
        console.log('fetch list section : failed');
      }
    }); 
  }


  
  listNiveau = signal<Niveau[]>([]); 
  getAllNiveau(){
    this.generalService.findAllNiveau().subscribe({
      next:(data :Niveau[])=>{
        this.listNiveau.set(data); 
      }, 
      error : ()=>{
        console.log('fetch list niveau : failed');
      }
    }); 
  }

  createNiveau(){
    const formData = new FormData(); 
    formData.append("niveau", JSON.stringify(this.niveauFb.value)); 
    console.log('data niveau:', this.niveauFb.value); 

    this.generalService.createNiveau(formData).subscribe({
      next:(data : ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error :()=>{
        console.log('creation section : failed'); 
      }
    });
  }


  deleteNiveau(id:any){
    this.generalService.deleteSection(id).subscribe({
      next:(data :ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error : ()=>{
        console.log('fetch list section : failed');
      }
    }); 
  }

  //Diplome 
  listDiplome = signal<Diplome[]>([]); 
  getAllDiplome(){
    this.generalService.findAllDiplomes().subscribe({
      next:(data :Diplome[])=>{
        this.listDiplome.set(data); 
      }, 
      error : ()=>{
        console.log('fetch list diplome : failed');
      }
    }); 
  }

  createDiplome(){
    const formData = new FormData(); 
    formData.append("diplome", JSON.stringify(this.diplomeFB.value)); 
    console.log('data diplome:', this.diplomeFB.value); 

    this.generalService.createDiplome(formData).subscribe({
      next:(data : ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error :()=>{
        console.log('creation diplome : failed'); 
      }
    });
  }


  deleteDiplome(id:any){
    this.generalService.deleteDiplome(id).subscribe({
      next:(data :ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error : ()=>{
        console.log('delete diplome : failed');
      }
    }); 
  }

  //Categorie matiere
  
  listCategorieMatiere = signal<CategorieMatiere[]>([]); 
  getAllCategorieMatiere(){
    this.generalService.findAllCategorieMatiere().subscribe({
      next:(data :CategorieMatiere[])=>{
        this.listCategorieMatiere.set(data); 
      }, 
      error : ()=>{
        console.log('fetch list diplome : failed');
      }
    }); 
  }

  createCategorieMatiere(){
    const formData = new FormData(); 
    formData.append("categorie", JSON.stringify(this.diplomeFB.value)); 
    console.log('data diplome:', this.diplomeFB.value); 

    this.generalService.createDiplome(formData).subscribe({
      next:(data : ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error :()=>{
        console.log('creation diplome : failed'); 
      }
    });
  }


  deleteCategorieMatiere(id:any){
    this.generalService.deleteCategorieMatiere(id).subscribe({
      next:(data :ResponseServer)=>{
        if (data.status) {
          alert(data.message); 
        }
      }, 
      error : ()=>{
        console.log('delete categorie matiere : failed');
      }
    }); 
  }


}
