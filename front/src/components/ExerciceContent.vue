
<template>
  <div class="container">
    <div class="enonce">
      <h3>Enoncé</h3>
      <div class="card">
        <div v-for="item in exo" :key="item">
          <p>
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="todo">
      <h3>Répense</h3>
      <div class="embed-nav group">
        <nav class="nav nav-tabs" id="nt">
          <a class="nav-item nav-linkactive" href="#yourcode" data-toggle="tab"
            >Code</a
          >

          <a
            class="nav-item nav-link"
            href="#sol"
            data-toggle="tab"
            v-if="active === true"
            >solution</a
          >

          <button class="nav-item nav-link" type="button" @click="runit()">
            <font-awesome-icon icon="play" />
          </button>
        </nav>
      </div>
      <div class="code">
        <div class="output">
          <div class="tab-content">
            <textarea
              id="yourcode"
              class="tab-pane fade show active"
              cols="40"
              rows="10"
            >
            </textarea>

            <textarea id="sol" class="tab-pane fade" cols="40" rows="10">
            </textarea>
          </div>
        </div>
        <div class="result">
          <textarea id="output" class="form-control" cols="40" rows="10">
          </textarea>
        </div>
        <footer class="embed-nav group">
          <ul>
            <li>
              <input
                class="form-control"
                type="text"
                id="solution"
                placeholder="Entrez le code de solution "
              />
            </li>
            <li>
              <button class="form-control" id="test" @click="activeSol()">
                <font-awesome-icon icon="check" />
              </button>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul {
  display: flex;
  list-style: none;
  color: #ddd;
  font-size: 0;
  margin-top: 7px;
}
#nt {
  display: flex;
  list-style: none;
  color: #ddd;
  font-size: 0;
  margin-top: 7px;
  margin-left: 30px;
}
.nav-item {
  background-color: #666666;
  font-size: 13px;
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif;
  display: inline-block;

  text-decoration: none;
  padding: 10px 16px 10px 16px;
  letter-spacing: 0.6px;
  font-size: 13px;
  -webkit-box-shadow: inset 0 3px transparent;
  box-shadow: inset 0 3px transparent;
  margin-right: 1px;
  color: #ddd;
}

.code {
  width: 800px;
  overflow: hidden;
  background-color: #333;
  font-family: Arial, Helvetica, sans-serif;
  display: inline-block;
}
.container {
  border-radius: 20px;
  text-align: center;
  margin-left: 400px;
}
h3 {
  margin-left: 20px;
}
#yourcode {
  float: left;
  background-color: #666666;
  color: #ddd;
}
div.output {
  display: inline-block;
  margin-left: 0px;
  margin-right: 50px;
}
div.result {
  display: inline-block;
  margin-right: 0px;
}

.embed-nav {
  overflow: hidden;
  background-color: #3d3d3e;
  font-family: Arial, Helvetica, sans-serif;
  width: 800px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.todo {
  text-align: center;
  width: 800px;
}
.enonce {
  margin-bottom: 50px;
  width: 800px;
}
</style>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
<script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script> 
<script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script> 



<script type="text/javascript">
import axios from "axios";
export default {
  name: "exrecises",

  components: {},
  data: function () {
    return {
      exo: [],
      active: Boolean,
    };
  },
  methods: {
    outf(text) {
      var mypre = document.getElementById("output");
      mypre.innerHTML = mypre.innerHTML + text;
    },
    builtinRead(x) {
      if (
        Sk.builtinFiles === undefined ||
        Sk.builtinFiles["files"][x] === undefined
      )
        throw "File not found: '" + x + "'";
      return Sk.builtinFiles["files"][x];
    },
    runit() {
      var prog = document.getElementById("yourcode").value;
      var mypre = document.getElementById("output");
      mypre.innerHTML = "";
      Sk.canvas = "mycanvas";

      Sk.configure({ output: this.outf, read: this.builtinRead });
      try {
        eval(Sk.importMainWithBody("<stdin>", false, prog));
      } catch (e) {
        alert(e.toString());
      }
    },
    activeSol() {
     /* this.exo.forEach((data) => {
        if (
          data.codeSolution !== undefined &&
          data.codeSolution === document.getElementById("dolution").value
        ) {
          this.active = true;
        } else {
          this.active = false;
        }
      });*/
      this.active = true;
    },
  },
  mounted() {
    axios.get("https://cpel.herokuapp.com/api/exercise/").then((response) => {
      console.log(this.$route.params);

      response.data.forEach((ex) => {
        if (ex.idExercise === this.$route.params.id) {
          if (ex.codeSolution !== undefined) {
            this.exo.push({
              name: ex.name,
              codeSolution: ex.codeSolution,
            });
          } else {
            this.exo.push({
              name: ex.name,
            });
          }

          console.log(this.exo);
        }
      });
    });
  },
};
</script> 
