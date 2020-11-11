import Dashboard from "../components/Professsors/Dashboards/Dashboard";
import Profile from "../components/Professsors/DetailsPages/Profile";
import CreateExercise from "@/components/Professsors/CreatePages/CreateExercise";
import CreateGroup from "@/components/Professsors/CreatePages/CreateGroup";
import CreateCorrection from "@/components/Professsors/CreatePages/CreateCorrection";
import EditCorrection from "@/components/Professsors/EditPages/EditCorrection";
import EditExercise from "@/components/Professsors/EditPages/EditExercise";
import EditGroup from "@/components/Professsors/EditPages/EditGroup";
import EditWording from "@/components/Professsors/EditPages/EditWording";
import Module from "@/components/Professsors/DetailsPages/Module";
import Group from "@/components/Professsors/DetailsPages/Group";
import Exercice from "@/components/Professsors/DetailsPages/Exercice";
import Student from "@/components/Professsors/DetailsPages/Student";
import CreateModule from "@/components/Professsors/CreatePages/CreateModule";
import StudentRending from "../components/Professsors/DetailsPages/StudentRending";

export default [
    {path: '/', component: Dashboard },
    {path: '/tableau-de-bord', component: Dashboard },
    {path: '/profil', component: Profile },
    {path: '/creer-exercice', component: CreateExercise },
    {path: '/creer-groupe', component: CreateGroup },
    {path: '/creer-correction', component: CreateCorrection },
    {path: '/creer-module', component: CreateModule },
    {path: '/editer-correction/:idCorrection', component: EditCorrection },
    {path: '/editer-exercice/:idExercice', component: EditExercise },
    {path: '/editer-groupe/:idGroup', component: EditGroup },
    {path: '/editer-enonce/', component: EditWording },
    {path: '/module/:idModule', component: Module },
    {path: '/group/:idGroup', component: Group },
    {path: '/:idModule/exercice/:idExercise', component: Exercice },
    {path: '/etudiant/:idStudent', component: Student },
    {path: '/etudiant/:idStudent/rendu-exercice/:idExercise', component: StudentRending },
]
