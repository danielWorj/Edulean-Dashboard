import { Filiere } from "../Academie/Filiere";
import { Niveau } from "../Academie/Niveau";
import { Eleve } from "../Utilisateur/Eleve/Eleve";
import { Parent } from "../Utilisateur/Parents";

export interface OffreRepetitionM{
     id :number ; 
    intitule :string;
    bio :string ; 
    salaireMin :string ; 
    salaireMax :string ;
    dateCreation :string; 
    frequence :number; 
    duree :number;  
    eleve:Eleve;  
}