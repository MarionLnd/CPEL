import Dashboard from "../components/Professsors/Dashboards/Dashboard";
import Profile from "../components/Professsors/DetailsPages/Profile";
import CreateExercise from "@/components/Professsors/CreatePages/CreateExercise";
import CreateGroup from "@/components/Professsors/CreatePages/CreateGroup";
import CreateCorrection from "@/components/Professsors/CreatePages/CreateCorrection";
import EditCorrection from "@/components/Professsors/EditPages/EditCorrection";
import EditExercise from "@/components/Professsors/EditPages/EditExercise";
import EditGroup from "@/components/Professsors/EditPages/EditGroup";
import Module from "@/components/Professsors/DetailsPages/Module";
import Group from "@/components/Professsors/DetailsPages/Group";
import Exercice from "@/components/Professsors/DetailsPages/Exercice";
import Student from "@/components/Professsors/DetailsPages/Student";
import CreateModule from "@/components/Professsors/CreatePages/CreateModule";
import StudentRending from "../components/Professsors/DetailsPages/StudentRending";

export default [
    // Professor interface
    {path: '/professeur/', component: Dashboard },
    {path: '/professeur/tableau-de-bord', component: Dashboard },
    {path: '/professeur/profil', component: Profile },
    {path: '/professeur/creer-exercice', component: CreateExercise },
    {path: '/professeur/creer-groupe', component: CreateGroup },
    {path: '/professeur/creer-correction', component: CreateCorrection },
    {path: '/professeur/creer-module', component: CreateModule },
    {path: '/professeur/editer-correction/:idCorrection', component: EditCorrection },
    {path: '/professeur/editer-exercice/:idExercice', component: EditExercise },
    {path: '/professeur/editer-groupe/:idGroup', component: EditGroup },
    {path: '/professeur/module/:idModule', component: Module },
    {path: '/professeur/groupe/:idGroup', component: Group },
    {path: '/professeur/:idModule/exercice/:idExercise', component: Exercice },
    {path: '/professeur/etudiant/:idStudent', component: Student },
    {path: '/professeur/etudiant/:idStudent/rendu-exercice/:idExercise', component: StudentRending },

    // Admin interface
    {path: '/admin/', component: Dashboard },
    {path: '/admin/tableau-de-bord', component: Dashboard },
    {path: '/admin/profil', component: Dashboard },
    {path: '/admin/creer-professeur', component: Dashboard },
    {path: '/admin/creer-etudiant', component: Dashboard },
    {path: '/admin/creer-groupe', component: Dashboard },
    {path: '/admin/gerer-professeurs', component: Dashboard },
    {path: '/admin/gerer-etudiants', component: Dashboard },
    {path: '/admin/gerer-groupes', component: Dashboard },
    {path: '/admin/professeurs', component: Dashboard },
    {path: '/admin/etudiants', component: Dashboard },
    {path: '/admin/groupes', component: Dashboard },
    {path: '/admin/professeur/:idProfessor', component: Dashboard },
    {path: '/admin/etudiant/:idStudent', component: Dashboard },
    {path: '/admin/groupe/:idGroup', component: Dashboard },
]
