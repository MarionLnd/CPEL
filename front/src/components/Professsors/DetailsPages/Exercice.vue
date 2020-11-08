<template>
    <div>
        <h1>Exercice</h1>
        <div class="container">
            <div class="enonce">
                <h3>Enoncé</h3>
                <div class="card">
                    <div v-for="item in exo" :key="item">
                        <p>{{ item.wording }}</p>
                    </div>
                </div>
            </div>
            <div class="todo">
                <h3>Réponse</h3>
                <div class="embed-nav group">
                    <nav id="nt" class="nav nav-tabs">
                        <a class="nav-item nav-linkactive" data-toggle="tab" href="#yourcode">Code</a>
                        <a
                            v-if="active === true"
                            class="nav-item nav-link"
                            data-toggle="tab"
                            href="#sol">solution</a>
                        <button class="nav-item nav-link" type="button" @click="runit()">
                            <font-awesome-icon icon="play"/>
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
                                rows="10"></textarea>
                            <textarea id="sol" class="tab-pane fade" cols="40" rows="10"></textarea>
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
                                    id="solution"
                                    class="form-control"
                                    placeholder="Entrez le code de solution "
                                    type="text"
                                />
                            </li>
                            <li>
                                <button id="test" class="form-control" @click="activeSol()">
                                    <font-awesome-icon icon="check"/>
                                </button>
                            </li>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script>
<script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script>
<script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script>

<script>
import axios from "axios";

export default {
    name: "Exercice",
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
}
</script>

<style scoped>

</style>
