//import Dashboard from "./components/Dashboards/Dashboard";
import Profile from "./components/Student/Profile";
import Login from "./components/Student/Login";
import Exercise from "./components/Student/Exercise";
import Student from "./components/Student/Student";
import Course from "./components/Student/Course";
import CourseContent from "./components/Student/CourseContent";
import ExerciceContent from "./components/Student/ExerciceContent";
import TD from "./components/Student/TD";
import Notifications from "./components/Student/Notifications";
import StudentRendering from "./components/Student/StudentRendering";

export default [
    {path: '/login', component: Login },
    {path: '/tableau-de-bord', component: Course },
    {path: '/profil', component: Profile },
    {path: '/course',component: Course},
    {path: '/student', component: Student },
    {path: '/exercise', component: Exercise },
    {path: '/td', component: TD },
    {path: '/courseContent/:id', component: CourseContent },
    {path: '/exerciceContent/:id', component: ExerciceContent },
    {path: '/notifications', component: Notifications },
    {path: '/rendering', component: StudentRendering }
    
]
