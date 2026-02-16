import { Component, signal } from '@angular/core';
import { GeneralService } from '../../../Core/Service/General/general-service';
import { UtilisateurService } from '../../../Core/Service/Utlisateur/utilisateur-service';
import { Enseignant } from '../../../Core/Model/Utilisateur/Enseignant/Enseignant';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponseServer } from '../../../Core/Model/Server/ResponseServer';
import { Section } from '../../../Core/Model/Academie/Section';
import { FileViewer } from "../../../Composants/file-viewer/file-viewer";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-enseignants',
  imports: [ReactiveFormsModule, FileViewer ],
  templateUrl: './enseignants.html',
  styleUrl: './enseignants.css',
})
export class EnseignantsComponent {

  enseignantForm! : FormGroup; 
  constructor(private fb: FormBuilder,private sanitizer: DomSanitizer,   private generalService : GeneralService, private utilisateurService: UtilisateurService) {
    this.loadPage(); 

        this.enseignantForm = this.fb.group({
        id: new FormControl(),
        nomComplet: new FormControl(),
        telephone: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        dateInscription: new FormControl(),
        status: new FormControl(),
        localisation: new FormControl(),
        photo: new FormControl(),
        anneeexperience: new FormControl(),
        dateNaissance: new FormControl(),
        bio: new FormControl(),
        tarifHoraire: new FormControl(),
        statusEnseignant: new FormControl(),
        cv: new FormControl(),
        diplomeurl: new FormControl(),
        section: new FormControl(),
        profilEnseignant: new FormControl(),
        diplome: new FormControl(),
        specialite : new FormControl()
    }); 

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

  lienPhoto = 'assets/images/apply-bg.jpg';

  cheminFile = 'assets/file/';

  enseignantSelected = signal<Enseignant | null>(null);
  nomDiplome = signal('');
  nomCV = signal('');
  lienFichier = signal('');

  selectEnseignant(enseignant: Enseignant) {
    this.enseignantSelected.set(enseignant);
    this.enseignantForm.patchValue(enseignant);

    this.lienFichier.set(this.cheminFile + enseignant.diplomeurl);
    this.nomDiplome.set(enseignant.diplomeurl);
    this.nomCV.set(enseignant.cv);


    this.loadFile(this.cheminFile + enseignant.cv, enseignant.cv);

    this.lienFichier.set(this.cheminFile + enseignant.diplomeurl);
    //this.lienFichierCNI.set(this.cheminFile + enseignant.cniurl);
  }

  changeStatus(id:number){
     this.utilisateurService.changeStatus(id).subscribe(
      (response: ResponseServer) => {
        console.log(response);
        this.getAllEnseignants(); 
      },
      (error) => {
        console.error('Error change status  enseignants:', error);
      }
    );
  }

  fileUrl: string = '';
  fileName: string = '';
  safeFileUrl?: SafeResourceUrl;
  fileType: 'image' | 'pdf' | 'other' = 'other';

   loadFile(url: string, name: string): void {
    this.fileUrl = url;
    this.fileName = name;
    
    // Détecter le type
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      this.fileType = 'image';
    } else if (extension === 'pdf') {
      this.fileType = 'pdf';
    }
    
    // Sécuriser l'URL
    this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
 
  listSection = signal<Section[]>([])
  getListSection(){
    this.generalService.findAllSections().subscribe(
      (response: Section[]) => {
        this.listSection.set(response)
      },
      (error) => {
        console.error('Error find all sections', error);
      })
  }

  deleteEnseignant(id:number){
   
  }

}
