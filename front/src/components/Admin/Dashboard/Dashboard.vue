<template>
    <div>
        <h1 class="pt-2 pb-2">Tableau de bord</h1>

        <ProfessorDashboard />
        <StudentDashboard />
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
