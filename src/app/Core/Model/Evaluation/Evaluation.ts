import { Eleve } from "../Utilisateur/Eleve/Eleve";
import { Composition } from "./Composition";

export interface Evaluation{
    id: number;
    startTime : string; 
    endTime :string; 
    note : number ; 
    completed : boolean ; 
    composition:Composition ; 
}

export interface TentativeEvaluation{
    id: number;
    startTime : string; 
    endTime :string; 
    note : number ; 
    completed : boolean ; 
    composition:Composition ;
}