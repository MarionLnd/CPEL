<template>
  <div>
    <h3 class="text-left">Les modules</h3>

      <table class="table">
          <thead>
          <tr>
              <th>Identifiant du module</th>
              <th>Nom du module</th>
              <th>Groupes concernés</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(mod, key) in data" :key="key">
              <td>{{ mod.idmodule }}</td>
              <td>{{ mod.name }}</td>
              <td>{{ mod.groups }}</td>
              <td>
                  <router-link :to="`/module/${mod.idmodule}`">Voir le module</router-link>
              </td>
          </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
  import axios from 'axios';
  //import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import _ from 'lodash';
  //import Vuetable from 'vuetable-2';

  export default {
    name: "ModuleDashboard",
    components: {
      //Vuetable
    },
    data(){
      return {
          data: [],
          fields: [
              {name: 'name', title: 'Nom', sortField: 'name'},
              {name: 'groups', title: 'Groupes concernés', sortField: 'groups'}
          ],
          perPage: 5
      }
    },
    mounted() {
      axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
        this.data = response.data;
      });
    },
    methods: {
      dataManager(sortOrder, pagination) {
        if (this.data.length < 1) return;

        console.log(this.data)

        let local = this.data;
        console.log(local)

        // sortOrder can be empty, so we have to check for that as well
        if (sortOrder.length > 0) {
          console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
          local = _.orderBy(
              local,
              sortOrder[0].sortField,
              sortOrder[0].direction
          );
        }

        pagination = this.$refs.vuetable.makePagination(
            local.length,
            this.perPage
        );
        console.log('pagination:', pagination)
        let from = pagination.from - 1;
        let to = from + this.perPage;

        return {
          pagination: pagination,
          data: _.slice(local, from, to)
        };
      },
    }
  }
</script>

<style scoped>

</style>
