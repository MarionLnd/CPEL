<template>
  <div class="container">
    <Header />

   <LeftMenu />
    <div class="exreciseCntent">
      <div class="enonce">
        <h3 class="title">Enoncé</h3>
        <div class="card">
          <div v-for="item in exo" :key="item">
            <p>
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="todo">
        <h3 class="title">Réponse</h3>
        <div class="embed-nav group">
          <nav class="nav nav-tabs" id="nt">
            <a
              class="nav-item nav-linkactive"
              href="#yourcode"
              data-toggle="tab"
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
             <li>
                <input type="button" :disabled='isDisabled' class="form-control" id="update" @click="updateSolution()" value=" Modifier">
              </li>
              <li>
            
                <input type="button" :disabled='isDisabled' class="form-control" id="send" @click="sendSolution()" value=" Envoyer">
                 
              
              </li>
               
            </ul>
          </footer>
        </div>
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
.title{
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
  
}

h4{
  color: #2F7777;
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
.exreciseCntent {
  border-radius: 20px;
  text-align: center;
  margin-left: 150px;
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
#deconexion {
  position: absolute;
  bottom: 0px;
}
#send {
  margin-left: 5px;
  width: 100px;
}
#update{
   margin-left: 300px;
  width: 100px;
}

</style>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
<script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script> 
<script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script> 



<script type="text/javascript">
import axios from "axios";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import moment from 'moment'

export default {
  name: "exrecises",

  components: {
    Header,
  LeftMenu
  },
  data: function () {
    return {
      exo: [],
      active: Boolean,
      today: Date,
      disable: true,
      date:Date,
      dateLimit: Date
    };
  },
  methods: {
    outf(text) {
      var myprog = document.getElementById("output");
      myprog.innerHTML = myprog.innerHTML + text;
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
      var solution = document.getElementById("sol").value;
      var myprog = document.getElementById("output");
      myprog.innerHTML = "";
      Sk.canvas = "mycanvas";

      Sk.configure({ output: this.outf, read: this.builtinRead });
      try {
        eval(Sk.importMainWithBody("<stdin>", false, prog));
        //  eval(Sk.importMainWithBody("<stdin>", false, solution));
      } catch (e) {
        myprog.innerHTML = e.toString();
      }
    },
    activeSol() {
      this.exo.forEach((data) => {
        if (data.codeSolution === document.getElementById("solution").value) {
          this.active = true;
          document.getElementById("sol").value = data.solution;
        } else {
          this.active = false;
        }
      });
    },

    sendSolution() {
      console.log(this.$route.params);

      axios
        .post(
          "https://cpel.herokuapp.com/api/studentRendering/" +
            this.$cookies.get("idStudent") +
            "/" +
            this.$route.params.id,
          {
            idStudent: this.$cookies.get("idStudent"),
            idExercise: this.$route.params.id,
            createdAt: new Date(),
            content: document.getElementById("yourcode").value,
            exerciseDone: true,
            comment: "bon debut",
          }
        )
        .then(function (response) {
          console.log(response);
         
        });
    },
    updateSolution(){
        axios
        .put(
          "https://cpel.herokuapp.com/api/studentRendering/" +
            this.$cookies.get("idStudent") +
            "/" +
            this.$route.params.id,
          {
           
            createdAt: new Date(),
            content: document.getElementById("yourcode").value,
           
          }
        )
        .then(function (response) {
          console.log(response);
         
        });
    }
  },

  mounted() {
    axios
      .get(
        "https://cpel.herokuapp.com/api/exercise/" +
          this.$cookies.get("idexercice")
      )
      .then((ex) => {
       
        
          console.log(this.$cookies.get("idexercice"));
          this.exo.push({
            name: ex.data.wording,
          });
          console.log(ex.data.wording);
          axios
            .get("https://cpel.herokuapp.com/api/correction")
            .then((response) => {
              response.data.forEach((corr) => {
                if (ex.data._id === corr.idExercise) {
                  
                  this.exo.push({
                    codeSolution: corr.correctionCode,
                    solution: corr.content,
                  });

                  
                }
              });
            });
                 axios
            .get("https://cpel.herokuapp.com/api/td")
            .then((response) => {
             
              response.data.forEach((td) => {
                 console.log(td._id)
                 console.log(ex.data._id )
                if (ex.data.idTD === td._id) {
                  
                 this.dateLimit =moment(String( td.dateLimit)).format('YYYY/MM/DD');
                 this.date =  moment(String(new Date() )).format('YYYY/MM/DD');
                 
                
                 console.log(this.dateLimit < this.date)
                 console.log(this.dateLimit)
                 console.log(this.date)
                }
              });
            });

          console.log(this.exo);
        
      });
  },
  computed: {
   isDisabled: function() {
     console.log("hi")
    return(
       this.date > this.dateLimit
      )
     
    },
  },
};
</script> 
