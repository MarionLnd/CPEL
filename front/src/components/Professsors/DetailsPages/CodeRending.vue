<template>
    <div class="text-left">
        <div class="mb-2">
            <h5>Enoncé :</h5>
            <p class="align-middle text-left">{{ exercise.wording }}</p>
        </div>
        <br>
        <h4 v-if="contentStudent">Rendu</h4>
        <div class="correction-div m-auto">
            <!-- if correction pour l'exercice afficher code sinon afficher, vous n'avez pas encore crée de correction pour cet exercice -->
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
                                rows="15" v-model="contentStudent" v-if="!hasCorrection">
                            </textarea>
                            <textarea
                                id="yourcode"
                                class="tab-pane fade show active"
                                cols="40"
                                rows="15" v-model="contentStudent" v-else>
                                </textarea>
                    </div>
                </div>
                <div class="result">
                  <textarea id="output" class="form-control" cols="40" rows="15">
                  </textarea>
                </div>
                <footer class="embed-nav group text-left" v-if="!hasCorrection">
                    <button class="btn btn-outline-light ml-3 m-3">Envoyer le code solution</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script>
<script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script>

<script>
    export default {
        name: "CodeRending",
        props: ['exercise', 'contentStudent', 'hasCorrection', 'contentCorrection'],
        data() {
            return {
                correction: {},//this.hasCorrection,
                active: false,
            }
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
        },
    }
</script>

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
.correction-div {
    text-align: center;
    width: 800px;
}
</style>
