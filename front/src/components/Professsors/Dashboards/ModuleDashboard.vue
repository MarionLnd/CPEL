<template>
  <div>
    <h3 class="text-left">Les modules</h3>

      <table class="table">
          <thead>
          <tr>
              <th>Nom du module</th>
              <th>Nombre d'exercices</th>
              <th>Groupes concernés</th>
              <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(mod, key) in data" :key="key">
              <td>{{ mod.name }}</td>
              <td>{{ mod.nbExercise }}</td>
              <td v-if="mod.groups.length === 0">
                  Aucun groupe
              </td>
              <td v-else>
                  {{ mod.groups }}
              </td>
              <td>
                  <router-link :to="`/module/${mod._id}`">Voir le module</router-link>
              </td>
          </tr>
          </tbody>

      </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    name: "ModuleDashboard",
    components: {
      //Vuetable
    },
    data(){
      return {
          data: [],
          paginate: ["modules"],
          fields: [
              {name: 'name', title: 'Nom', sortField: 'name'},
              {name: 'groups', title: 'Groupes concernés', sortField: 'groups'}
          ],
          perPage: 5,
          exercises: []
      }
    },
    mounted() {
      axios.get("https://cpel.herokuapp.com/api/module/").then(response => {
          this.data = response.data;
          for (let mod of response.data) {
              mod.nbExercise = this.countExercises(mod.idmodule)
              //console.log(this.countExercises(mod.idmodule))
          }
      });
        axios.get("https://cpel.herokuapp.com/api/exercise/").then(response => {
            this.exercises = response.data;
        });
    },
    methods: {
        countExercises(idModule) {
            let nbExercises = 0
            for (let exercise of this.exercises) {
                if (exercise.idModule === idModule) {
                    nbExercises++
                }
            }
            console.log(nbExercises) // TODO Pourquoi le bon nombre apparait que avec le console log ?
            return nbExercises;
        },
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
