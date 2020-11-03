//import Dashboard from "./components/Dashboards/Dashboard";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Exercise from "./components/Exercise";
import Student from "./components/Student";
import Course from "./components/Course";
import CourseContent from "./components/CourseContent";
import ExerciceContent from "./components/ExerciceContent";
export default [
    {path: '/login', component: Login },
    {path: '/tableau-de-bord', component: Course },
    {path: '/profil', component: Profile },
    {path: '/course', component: Course },
    {path: '/student', component: Student },
    {path: '/exercise', component: Exercise },
    {path: '/courseContent/:id', component: CourseContent },
    {path: '/exerciceContent/:id', component: ExerciceContent }
    
]
