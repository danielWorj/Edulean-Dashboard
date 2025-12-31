import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../../Model/Academie/Section';
import { ServerResponse } from 'http';
import { StatusEnseignant } from '../../Model/Utilisateur/Enseignant/StatusEnseignant';
import { Diplome } from '../../Model/Utilisateur/Enseignant/Diplome';
import { edulearnDashboard } from '../../Constant/EndPoints';
import { ProfilEnseignant } from '../../Model/Utilisateur/Enseignant/ProfilEnseignant';
import { Filiere } from '../../Model/Academie/Filiere';
import { Niveau } from '../../Model/Academie/Niveau';
import { Matiere } from '../../Model/Academie/Matiere';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  constructor(private http :HttpClient) { }

  //Section
  findAllSections():Observable<Section[]> {
    return this.http.get<Section[]>(edulearnDashboard.General.Section.all);
  }

  createSection(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(edulearnDashboard.General.Section.create, request);
  }

  updateSection(request:any):Observable<ServerResponse>{
    return this.http.put<ServerResponse>(edulearnDashboard.General.Section.update, request);
  }

  deleteSection(idSection:number):Observable<ServerResponse>{ 
    return this.http.delete<ServerResponse>(edulearnDashboard.General.Section.delete + idSection);
  }

  //Filiere
  findAllFiliere():Observable<Filiere[]> {
    return this.http.get<Filiere[]>(edulearnDashboard.General.Filiere.all);
  }

  findAllFiliereBySection(id :number):Observable<Filiere[]> {
    return this.http.get<Filiere[]>(edulearnDashboard.General.Filiere.allBySection+id);
  }


  //Niveau
  findAllNiveau():Observable<Niveau[]> {
    return this.http.get<Niveau[]>(edulearnDashboard.General.Niveau.all);
  }

  findAllNiveauBySection(id :number):Observable<Niveau[]> {
    return this.http.get<Niveau[]>(edulearnDashboard.General.Niveau.allBySection+id);
  }

  //Profil Enseignant
  findAllProfilEnseignants():Observable<ProfilEnseignant[]> {
    return this.http.get<ProfilEnseignant[]>(edulearnDashboard.General.ProfilEnseignant.all); 
  }

  createProfilEnseignant(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(edulearnDashboard.General.ProfilEnseignant.create, request);
  }

  deleteProfilEnseignant(idProfilEnseignant:number):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(edulearnDashboard.General.ProfilEnseignant.delete + idProfilEnseignant);
  }

  //Status Enseignant
  findAllStatusEnseignants():Observable<StatusEnseignant[]> {
    return this.http.get<StatusEnseignant[]>(edulearnDashboard.General.StatusEnseignant.all); 
  }

  createStatusEnseignant(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(edulearnDashboard.General.StatusEnseignant.create, request);
  }
  deleteStatusEnseignant(idStatusEnseignant:number):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(edulearnDashboard.General.StatusEnseignant.delete + idStatusEnseignant);
  }

  //Profil Enseignant 
  findAllDiplomes():Observable<Diplome[]> {
    return this.http.get<any[]>(edulearnDashboard.General.Diplome.all); 
  }

  createDiplome(request:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(edulearnDashboard.General.Diplome.create, request);
  }

  deleteDiplome(idDiplome:number):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(edulearnDashboard.General.Diplome.delete + idDiplome);
  }


  //Matiere
  findAllMatiereBySection(id:number):Observable<Matiere[]> {
    return this.http.get<Matiere[]>(edulearnDashboard.General.Matiere.allBySection+id); 
  }
  
}
