<template>
<div>
      <ClosePoint></ClosePoint>

    <Sidebar>
      <h4><router-link class="nav-link" to="/course">Cours </router-link></h4>
      <br />
      <h4>
        <router-link class="nav-link" to="/td">
          TDs
        
        </router-link>
      </h4>
      <br />
      <h4> <router-link class="nav-link" to="/notifications">Notifications </router-link></h4>

   
    </Sidebar>
    </div>
</template>
<style scoped>
a{
  color: #4E4E4E;
}
a:focus{
  color: #2F7777 ;
}

.nav-link {
  position: relative;
  display: inline-block;
  margin: 10px 13px 10px 10px;
}
.badge-block .e-badge.leftTop {
  transform: translateX(-150%);
}
</style>
<script>

import ClosePoint from "./ClosePoint";
import Sidebar from "./SideBarMenu";
export default {
    name: "leftBar",
  components: {
  
    ClosePoint,
    Sidebar,
   
  },
}
</script>