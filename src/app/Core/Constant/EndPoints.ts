const api = "http://localhost:8080/edulearn/api"
const userapi = `${api}/user`; 
const repetitionapi = `${api}/repetition`; 
const marketplaceapi = `${api}/marketplace`; 
const generalapi = `${api}/general`; 



export const edulearnDashboard = {
    Auth :{
        login : `${userapi}/login`, 
    }, 
    Enseignant :{
        all : `${userapi}/enseignant/all`,
        allBySection : `${userapi}/enseignant/all/bysection/`,
        allByStatus : `${userapi}/enseignant/all/bystatus/`,
        allByProfil : `${userapi}/enseignant/all/byProfil/`,
        count : `${userapi}/enseignant/count/`, 
        create : `${userapi}/enseignant/create`,
        findById : `${userapi}/enseignant/findById/`,
        changestatus : `${userapi}/status/`,
    }, 

    Eleve :{
        allByParent : `${userapi}/eleve/allbyparent/`,
        countByParent : `${userapi}/eleve/countbyParent/`,
        create : `${userapi}/eleve/create`,
    }, 
    OffreRepetition :{
        all : `${repetitionapi}/offre/all`,
        findById : `${repetitionapi}/offre/findById/`,
        findByCode : `${repetitionapi}/offre/findByCode/`,
        create : `${repetitionapi}/offre/create`,
        update : `${repetitionapi}/offre/update`,
        delete : `${repetitionapi}/offre/delete/`,
        findByParent : `${repetitionapi}/offre/all/byparent/`,
    }, 
    SessionRepetition :{
        all : `${repetitionapi}/all`,
        findByEnseignant : `${repetitionapi}/allsession/byenseignant/`,
        create : `${repetitionapi}/create`,
        update : `${repetitionapi}/update`,
        delete : `${repetitionapi}/delete/`,
        findByParent : `${repetitionapi}/all/byparent/`,


        //Matiere repetition 
        MatiereRepetition : {
            allByRepetition : `${repetitionapi}/matiere-repetition/all/byrepetition/`,
            create : `${repetitionapi}/matiere-repetition/create`,
        }, 
        HoraireRepetition :{
             allByRepetition : `${repetitionapi}/horaire-repetition/all/byrepetition/`,
             create : `${repetitionapi}/horaire-repetition/create`,
        }
    }, 
    
    MarketPlace :{
        all : `${marketplaceapi}/all`,
        create : `${marketplaceapi}/create`,
        allType : `${marketplaceapi}/typeRessource/all`,
    }, 
    
    General :{
        Section :{
            all : `${generalapi}/section/all`,
            create : `${generalapi}/section/create`,
            update : `${generalapi}/section/update`,
            delete : `${generalapi}/section/delete/`,
        },

        Niveau :{
            all : `${generalapi}/niveau/all`,
            allBySection : `${generalapi}/niveau/allbySection/`,
            create : `${generalapi}/niveau/create`,
            update : `${generalapi}/niveau/update`,
            delete : `${generalapi}/niveau/delete/`,
        },
        Filiere :{
            all : `${generalapi}/filiere/all`,
            allBySection : `${generalapi}/filiere/allbySection/`,
            create : `${generalapi}/filiere/create`,
            update : `${generalapi}/filiere/update`,
            delete : `${generalapi}/filiere/delete/`,
        },
        ProfilEnseignant :{
            all : `${generalapi}/profil-enseignant/all`,
            create : `${generalapi}/profil-enseignant/create`,
            delete : `${generalapi}/profil-enseignant/delete/`,
        }, 

        StatusEnseignant :{
            all : `${generalapi}/status-enseignant/all`,
            create : `${generalapi}/status-enseignant/create`,
            delete : `${generalapi}/status-enseignant/delete/`,
        },
        Diplome :{
            all : `${generalapi}/diplome/all`,
            create : `${generalapi}/diplome/create`,
            delete : `${generalapi}/diplome/delete/`,
        },

        Matiere :{
            all : `${generalapi}/matiere/all`,
            allBySection : `${generalapi}/matiere/allbySection/`,
            create : `${generalapi}/matiere/create`,
            delete : `${generalapi}/matiere/delete/`,
        },


    }

}