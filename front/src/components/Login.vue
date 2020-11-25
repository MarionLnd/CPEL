<template>
  <div class="container">
    <div class="card" style="float: left; margin-right: 10px">
      <div class="container">
        <form>
          <label>ID</label>
          <input type="text" id="professor" />
          <label>password</label>
          <input type="password" />
          <button @click.stop.prevent="submit()">Submit</button>
        </form>
      </div>
    </div>
    <div class="card" style="float: right">
      <div class="container">
        <form>
          <label>ID</label>
          <input type="text" id="student" />
          <label>password</label>
          <input type="password" id="studentPassword" />
          <button @click.stop.prevent="submit()">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style  scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.card {
  width: 500px;
  height: 400px;
  background-color: #84a9ac;
  margin-top: 100px;
}
button {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #84a9ac;
}
</style>
<script>
import axios from "axios";

export default {
  name: "modules",
  data() {
    return {
      page: [],
    };
  },
  methods: {
    submit() {
      axios.get("https://cpel.herokuapp.com/api/user/").then((response) => {
        console.log("ok");
        response.data.forEach((user) => {
          console.log(document.getElementById("student").value);
          if (
            user.username === document.getElementById("student").value &&
            user.password === document.getElementById("studentPassword").value
          ) {
            console.log("ok");
            if (user.type === "student") {
              axios
                .get("https://cpel.herokuapp.com/api/student/")
                .then((response) => {
                  response.data.forEach((student) => {
                    this.$router.push("/course");
                    if (response._id === user.username) {
                      this.$cookies.set("idStudent", student._id);
                      console.log(this.$cookies.get("idStudent"));
                    }
                  });
                });
            } else {
              axios
                .get("https://cpel.herokuapp.com/api/professor/")
                .then((response) => {
                  response.data.forEach((prof) => {
                    this.$router.push("/course");
                    if (response._id === user.username) {
                      this.$cookies.set("idProfessor", prof._id);
                      console.log(this.$cookies.get("idProfessor"));
                    }
                  });
                });
            }
          }
        });
      });
    },
  },
};
</script>
