import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EvaluationService } from '../../../Core/Service/Evaluation/evaluation-service';
import { sign } from 'crypto';
import { Matiere } from '../../../Core/Model/Academie/Matiere';
import { RepetitionService } from '../../../Core/Service/Repetition/repetition-service';
import { Composition } from '../../../Core/Model/Evaluation/Composition';
import { QuestionConstruct } from '../../../Core/Model/Evaluation/Question';
import { ReponsePossible } from '../../../Core/Model/Evaluation/ReponsePossible';
import { ResponseServer } from '../../../Core/Model/Server/ResponseServer';

@Component({
  selector: 'app-evaluation',
  imports: [],
  templateUrl: './evaluation.html',
  styleUrl: './evaluation.css',
})
export class Evaluation {
  tentativeCompositionForm !:FormGroup; 
  reponseEleveForm!:FormGroup; 
  idEleve = signal<number>(0); 
  constructor(private fb:FormBuilder, private evaluationService : EvaluationService , private repetitionService : RepetitionService){
    this.tentativeCompositionForm = this.fb.group({
      id : new FormControl(), 
      startTime : new FormControl(), 
      endTime : new FormControl(), 
      note : new FormControl(), 
      completed : new FormControl(), 
      composition : new FormControl(), 

    })
    
    this.reponseEleveForm = this.fb.group({
      id : new FormControl(), 
      evaluation : new FormControl(), 
      question : new FormControl(), 
      reponseChoisie : new FormControl(), 
    }); 

    this.idEleve.set(2); // Valeur par défaut
    //this.idEleve.set(Number(localStorage.getItem('idUser')));


  }

  //1- Liste des matiere 
  listMatiere = signal<Matiere[]>([]); 
  getAllMatiere(){
    this.repetitionService.findAllMatiereByEleve(this.idEleve()).subscribe({
      next:(data :Matiere[])=>{
        this.listMatiere.set(data);
        console.log('list matieer', this.listMatiere()); 
      }, 
      error: ()=>{
        console.log('Fetch list matiere by eleve : failed'); 
        
      }
    }); 
  }

  //2- Liste des compistion par matiere 
  listCompositionByMatiere = signal<Composition[]>([]);
  getAllCompoByMatiere(id:number){
    this.evaluationService.getAllCompositionByMatiere(id).subscribe({
      next:(data :Composition[])=>{
        this.listCompositionByMatiere.set(data); 
        console.log('list compo by matiere', this.listCompositionByMatiere()); 

      }, 
      error:()=>{
        console.log('Fecth list compo by matiere : failed'); 
      }
    })
  }

  //Apres avoir clique sur une composition 
  //Un pop apparait avec un bouton commencer 
  idComposition =0; 
  duree = 0 //dureee en minute 
  selectComposition(c:Composition){
    this.idComposition = c.id;
    this.duree = parseInt(c.duree); 
  }


  //Des qu il clique sur le bouton la compistion s affiche et le compteur commence 
  //Creation d une tentative de compisition 
  idEvaluation =0; 
  creationTentativeComposition(){
    this.tentativeCompositionForm.controls['composition'].setValue(this.idComposition);
    
    console.log(this.tentativeCompositionForm.value); 
    const formData : FormData = new FormData; 
    formData.append("evaluation", JSON.stringify(this.tentativeCompositionForm.value));
    
    this.evaluationService.createTentativeEvaluation(formData).subscribe({
      next:(data:number)=>{
        if (data!=0) {
          this.idEvaluation = data; 
          console.log('la tentative d evaluation a bien ete faite'); 
        }
      }, 
      error : ()=>{
        console.log('Creation d une tentative de composition : failed'); 
      }
    }); 
  
  }


  //Afficher la liste des questions et reponses possible  
  //Construction de la liste 
  listQuestionReponsePossibleConstruct = signal<QuestionConstruct[]>([]); 
  async findAllconstructQuestionReponsePossibleForComposition(id:number){
    console.log('construct for composition id :', id);

    // Stocker temporairement les résultats
    const tempResults: QuestionConstruct[] = [];

    try {
        let allquestion = await this.evaluationService.getAllQuestionByComposition(id).toPromise();

        if (!allquestion || allquestion.length === 0) {
            this.listQuestionReponsePossibleConstruct.set([]);
            return;
        }

        // Construire tous les résultats AVANT de mettre à jour le signal
        for(const question of allquestion){
            let reponses = await this.evaluationService.getAllReponsePossibleByQuestion(question.id).toPromise();

            const QuestionConstruct: QuestionConstruct = {
                question : question, 
                reponsesPossibles : reponses || []
            };
            
            tempResults.push(QuestionConstruct);
        }

        // Mettre à jour le signal UNE SEULE FOIS avec toutes les données
        this.listQuestionReponsePossibleConstruct.set(tempResults);
        console.log('la liste construite est :', this.listQuestionReponsePossibleConstruct());
        
    } catch (error) {
        console.error('Erreur lors de la construction des questions:', error);
        this.listQuestionReponsePossibleConstruct.set([]);
    } 
  }

  //Des qu il coche une case creation d une reponse eleve 
  idReponseChoisie = 0; 
  idQuestion =0; 
  SelectReponse(r:ReponsePossible){
    this.idReponseChoisie = r.id; 
    this.idQuestion = r.question.id; 
  }
  creationReponseEleve(){
    this.reponseEleveForm.controls['evaluation'].setValue(this.idEvaluation); 
    this.reponseEleveForm.controls['question'].setValue(this.idQuestion); 
    this.reponseEleveForm.controls['reponseChoisie'].setValue(this.idReponseChoisie);
    
    console.log(this.reponseEleveForm.value); 
    const formData : FormData = new FormData(); 
    formData.append("reponseeleve",JSON.stringify(this.reponseEleveForm.value)); 

    this.evaluationService.createReponseEleve(formData).subscribe({
      next:(data : ResponseServer)=>{
          if (data.status) {
            console.log('reponse elve ajoutee pour la question'+this.idQuestion); 
          }
      }, 
      error:()=>{
        console.log('Erreur creation reponse elve : failed'); 
      }
    }); 

  }
  //Des qu il clique sur termine ou le compte a rebour ternine 
  compteARebour(){
    this.calculerHeureFin(this.duree); //Calculer de fin 
  }

  heureFin :any;   
  calculerHeureFin(minutes: number) {
    const maintenant = new Date();
    this.heureFin = new Date(maintenant.getTime() + minutes * 60000);
  }

  //Afficahe de la note 
  noteFinal = signal<number>(0); 
  
  findNoteFinal(){
    //id tenta
    this.evaluationService.findNoteFinalForTentativeEvaluation(this.idEvaluation).subscribe({
      next:(data :number)=>{
        this.noteFinal.set(data); 
        console.log('note final obtenu', data); 

      }, 
      error:()=>{
        console.log('Fecth note obtenu : failed'); 
      }
    })
  }

  //Affichage de la correction

  


  //Scenario 
  // 1- Liste des matiere 
  // 2- Liste des compistion par matiere 

  //   -> Apres avoir clique sur une composition 
  //   -> Un pop apparait avec un bouton commencer 
  //   -> Des qu il clique sur le bouton la compistion s affiche et le compteur commence 
  //     -> Creation d une tentative de compisition 
    
  // 3- Afficher la liste des questions et reponses possible  
  //   -> Des qu il coche une case creation d une reponse eleve 
  //   -> Des qu il clique sur termine ou le compte a rebour ternine 
  //     -> Affiche de sa note 
  //     -> Affiche la correction 


}
