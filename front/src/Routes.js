import Register from "@/components/Register";

// Professor
import Dashboard from "@/components/Professsors/Dashboards/Dashboard";
import Profile from "@/components/Professsors/DetailsPages/Profile";
import CreateExercise from "@/components/Professsors/CreatePages/CreateExercise";
import CreateGroup from "@/components/Professsors/CreatePages/CreateGroup";
import CreateCorrection from "@/components/Professsors/CreatePages/CreateCorrection";
import EditCorrection from "@/components/Professsors/EditPages/EditCorrection";
import EditExercise from "@/components/Professsors/EditPages/EditExercise";
import EditGroup from "@/components/Professsors/EditPages/EditGroup";
import Module from "@/components/Professsors/DetailsPages/Module";
import Group from "@/components/Professsors/DetailsPages/Group";
import Exercice from "@/components/Professsors/DetailsPages/Exercice";
import StudentDetailPage from "@/components/Professsors/DetailsPages/Student";
import CreateModule from "@/components/Professsors/CreatePages/CreateModule";
import ProfStudentRending from "@/components/Professsors/DetailsPages/StudentRending";
import CreateTD from "@/components/Professsors/CreatePages/CreateTD";
import TD from "@/components/Professsors/DetailsPages/TD";

// Admin
import DashboardAdmin from "@/components/Admin/Dashboard/Dashboard";
import ProfileAdmin from "@/components/Admin/DetailsPages/Profile";
import AddProfessor from "@/components/Admin/CreatePages/AddProfessor";
import AddStudent from "@/components/Admin/CreatePages/AddStudent";
import AddGroup from "@/components/Admin/CreatePages/AddGroup";
import EditProfessor from "@/components/Admin/EditPages/EditProfessor";
import EditStudent from "@/components/Admin/EditPages/EditStudent";
import EditGroupAdmin from "@/components/Admin/EditPages/EditGroup";
import Professors from "@/components/Admin/DetailsPages/Professors";
import Students from "@/components/Admin/DetailsPages/Students";
import Groups from "@/components/Admin/DetailsPages/Groups";


// Student
import ProfileStudent from "@/components/Student/Profile";
import Login from "@/components/Student/Login";
import Course from "@/components/Student/Course";
import ExerciseStudent from "@/components/Student/Exercise";
import Student from "@/components/Student/Student";
import CourseContent from "@/components/Student/CourseContent";
import ExerciceContent from "@/components/Student/ExerciceContent";
import TDStudent from "@/components/Student/TD";
import Notifications from "@/components/Student/Notifications";
import StudentRendering from "@/components/Student/StudentRendering";

export default [
    // Register
    {path: '/inscription/', component: Register },

    // Login
    {path: '/login', component: Login },

    // Professor interface
    {path: '/professeur/', component: Dashboard },
    {path: '/professeur/tableau-de-bord', component: Dashboard },
    {path: '/professeur/profil', component: Profile },
    {path: '/professeur/creer-exercice', component: CreateExercise },
    {path: '/professeur/creer-td', component: CreateTD },
    {path: '/professeur/creer-groupe', component: CreateGroup },
    {path: '/professeur/creer-correction', component: CreateCorrection },
    {path: '/professeur/creer-module', component: CreateModule },
    {path: '/professeur/editer-correction/:idCorrection', component: EditCorrection },
    {path: '/professeur/editer-exercice/:idExercice', component: EditExercise },
    {path: '/professeur/editer-groupe/:idGroup', component: EditGroup },
    {path: '/professeur/module/:idModule', component: Module },
    {path: '/professeur/td/:idTD', component: TD },
    {path: '/professeur/groupe/:idGroup', component: Group },
    {path: '/professeur/:idModule/exercice/:idExercise', component: Exercice },
    {path: '/professeur/etudiant/:idStudent', component: StudentDetailPage, props: (route) => ({ query: route.query.groupName })},
    {path: '/professeur/etudiant/:idStudent/rendu-exercice/:idExercise', component: ProfStudentRending, props: (route) => ({ query: route.query.idStudentRending })},

    // Admin interface
    {path: '/admin/', component: DashboardAdmin },
    {path: '/admin/tableau-de-bord', component: DashboardAdmin },
    {path: '/admin/profil', component: ProfileAdmin },
    {path: '/admin/ajouter-professeur', component: AddProfessor },
    {path: '/admin/ajouter-etudiant', component: AddStudent },
    {path: '/admin/ajouter-groupe', component: AddGroup },
    {path: '/admin/gerer-professeurs', component: EditProfessor },
    {path: '/admin/gerer-etudiants', component: EditStudent },
    {path: '/admin/gerer-groupes', component: EditGroupAdmin },
    {path: '/admin/professeurs', component: Professors },
    {path: '/admin/etudiants', component: Students },
    {path: '/admin/groupes', component: Groups },
    {path: '/admin/professeur/:idProfessor', component: Dashboard },
    {path: '/admin/etudiant/:idStudent', component: Dashboard },
    {path: '/admin/groupe/:idGroup', component: Dashboard },

    // Student interface
    {path:'/tableau-de-bord', component: Course },
    {path:'/profil', component: ProfileStudent },
    {path:'/course',component: Course},
    {path:'/student', component: Student },
    {path:'/exercise', component: ExerciseStudent },
    {path:'/td', component: TDStudent },
    {path:'/courseContent/:id', component: CourseContent },
    {path:'/exerciceContent/:id', component: ExerciceContent },
    {path:'/notifications', component: Notifications },
    {path:'/rendering', component: StudentRendering},
]
