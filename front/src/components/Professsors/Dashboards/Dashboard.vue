<template>
    <div class="container">
        <h1 class="pt-4">Tableau de bord</h1>
        <ModuleDashboard class="p-4"/>
        <GroupDashboard class="p-4"/>
    </div>
</template>

<script>
  import ModuleDashboard from "@/components/Professsors/Dashboards/ModuleDashboard";
  import GroupDashboard from "@/components/Professsors/Dashboards/GroupDashboard";

  export default {
    name: "Dashboard",
    components: {
      GroupDashboard,
      ModuleDashboard
    },
    data(){
      return {

      }
    }
  }

</script>

<style scoped>

</style>
