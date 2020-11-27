<template>
    <div>
        <h1 class="pt-3 pb-3">Tableau de bord - Administrateur</h1>

        <ProfessorDashboard class="pb-3"/>
        <StudentDashboard class="pb-3" />
        <GroupDashboard />
    </div>
</template>

<script>
import ProfessorDashboard from "@/components/Admin/Dashboard/ProfessorDashboard";
import StudentDashboard from "@/components/Admin/Dashboard/StudentDashboard";
import GroupDashboard from "@/components/Admin/Dashboard/GroupDashboard";

export default {
    name: "Dashboard",
    components: {GroupDashboard, StudentDashboard, ProfessorDashboard}
}
</script>

<style scoped>

</style>
