<template>
  <div>
    <h3 class="text-left text-u">Les groupes d'élèves</h3>
    <Vuetable ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :per-page="perPage"
              :data-manager="dataManager"
    >
    </Vuetable>
  </div>
</template>

<script>
  import Vuetable from 'vuetable-2';
  import _ from 'lodash';

  export default {
    name: "GroupDashboard",
    components: {
      Vuetable
    },
    data(){
      return {
        data: [
          {
            "moduleId": 1,
            "name": "Module 1",
            "title": "delectus aut autem",
            "modules": ["Python"]
          },
          {
            "moduleId": 2,
            "name": "Module 2",
            "title": "delectus aut autem",
            "modules": ["ModuleA"]
          },
          {
            "moduleId": 3,
            "name": "Module 3",
            "title": "delectus aut autem",
            "modules": ["ModuleB"]
          },
          {
            "moduleId": 4,
            "name": "Module 4",
            "title": "delectus aut autem",
            "modules": ["ModuleA", "ModuleC"]
          },
        ],
        fields: [
          {name: 'name', title: 'Nom', sortField: 'name'},
          {name: 'title', title: 'Description'},
          {name: 'modules', title: 'Modules liés', sortField: 'modules'}
        ],
        perPage: 5
      }
    },
    methods: {
      dataManager(sortOrder, pagination) {
        if (this.data.length < 1) return;

        let local = this.data;

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
