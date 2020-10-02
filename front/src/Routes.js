import Dashboard from "./components/Dashboards/Dashboard";
import Profile from "./components/Profile";
import CreateExercise from "@/components/CreatePages/CreateExercise";
import CreateGroup from "@/components/CreatePages/CreateGroup";

export default [
    {path: '/', component: Dashboard },
    {path: '/tableau-de-bord', component: Dashboard },
    {path: '/profil', component: Profile },
    {path: '/creer-exercice', component: CreateExercise },
    {path: '/creer-groupe', component: CreateGroup },
]
