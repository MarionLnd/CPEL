import Sk from 'skulpt/dist/skulpt.min'

// output functions are configurable.  This one just appends some text
// to a pre element.
export function outf(text) {
    let mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
export function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
export function runit() {
    let prog = document.getElementById("yourcode").value;
    let mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead});
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    let myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
            console.log('success');
            console.log(mod)
        },
        function(err) {
            console.log(err.toString());
        });
}
