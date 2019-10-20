const Q=function(t){return Q.Program.fromText(t)};Object.assign(Q,{verbosity:.5,animals:[],colors:[],warn:function(){return console.warn(...arguments),"(warning)"},error:function(){return console.error(...arguments),"(error)"},extractDocumentation:function(t){const n=(t=t.toString()).indexOf("`")+1,e=t.indexOf("`",n),r=t.substring(n,e).split("\n");let o=Number.MAX_SAFE_INTEGER;return r.forEach(function(t){if(t){const n=function(t){let n=index=0;for(;"\t"===t.charAt(index++);)n++;return n}(t);o>n&&(o=n)}}),r.forEach(function(t,n){""===t.trim()&&(t="\n\n"),r[n]=t.substring(o).replace(/ {2}$/,"\n")}),r.join("")},help:function(t){return void 0===t&&(t=Q),Q.extractDocumentation(t)},constants:{},createConstant:function(t,n){this[t]=n,this.constants[t]=this[t],Object.freeze(this[t])},createConstants:function(){if(arguments.length%2!=0)return Q.error("Q attempted to create constants with invalid (KEY, VALUE) pairs.");for(let t=0;t<arguments.length;t+=2)this.createConstant(arguments[t],arguments[t+1])},loop:function(){},hypotenuse:function(t,n){let e=Math.abs(t),r=Math.abs(n);return e<2048&&r<2048?Math.sqrt(e*e+r*r):(e<r?(e=r,r=t/n):r=n/t,e*Math.sqrt(1+r*r))},logHypotenuse:function(t,n){const e=Math.abs(t),r=Math.abs(n);return 0===t?Math.log(r):0===n?Math.log(e):e<2048&&r<2048?Math.log(t*t+n*n)/2:Math.log(t/Math.cos(Math.atan2(n,t)))},hyperbolicSine:function(t){return(Math.exp(t)-Math.exp(-t))/2},hyperbolicCosine:function(t){return(Math.exp(t)+Math.exp(-t))/2},round:function(t,n){"number"!=typeof n&&(n=0);const e=Math.pow(10,n);return Math.round(t*e)/e},toTitleCase:t=>(t=t.replace(/_/g," ")).toLowerCase().split(" ").map(function(t){return t.replace(t[0],t[0].toUpperCase())}).join(" ")}),Q.createConstants("REVISION",3,"EPSILON",6*Number.EPSILON,"RADIANS_TO_DEGREES",180/Math.PI);
Q.ComplexNumber=function(e,r){if(e instanceof Q.ComplexNumber?(r=e.imaginary,e=e.real,Q.warn("Q.ComplexNumber tried to create a new instance with an argument that is already a Q.ComplexNumber — and that’s weird!")):void 0===e&&(e=0),void 0===r&&(r=0),!0!==Q.ComplexNumber.isNumberLike(e)||!0!==Q.ComplexNumber.isNumberLike(r))return Q.error("Q.ComplexNumber attempted to create a new instance but the arguments provided were not actual numbers.");this.real=e,this.imaginary=r,this.index=Q.ComplexNumber.index++},Object.assign(Q.ComplexNumber,{index:0,help:function(){return Q.help(this)},constants:{},createConstant:Q.createConstant,createConstants:Q.createConstants,isNumberLike:function(e){return"number"==typeof e||e instanceof Number},isNaN:function(e){return isNaN(e.real)||isNaN(e.imaginary)},isZero:function(e){return!(0!==e.real&&-0!==e.real||0!==e.imaginary&&-0!==e.imaginary)},isFinite:function(e){return isFinite(e.real)&&isFinite(e.imaginary)},isInfinite:function(e){return!(this.isNaN(e)||this.isFinite(e))},areEqual:function(e,r){return Q.ComplexNumber.operate("areEqual",e,r,function(e,r){return Math.abs(e-r)<Q.EPSILON},function(e,r){return Math.abs(e-r.real)<Q.EPSILON&&Math.abs(r.imaginary)<Q.EPSILON},function(e,r){return Math.abs(e.real-r)<Q.EPSILON&&Math.abs(e.imaginary)<Q.EPSILON},function(e,r){return Math.abs(e.real-r.real)<Q.EPSILON&&Math.abs(e.imaginary-r.imaginary)<Q.EPSILON})},absolute:function(e){return Q.hypotenuse(e.real,e.imaginary)},conjugate:function(e){return new Q.ComplexNumber(e.real,-1*e.imaginary)},operate:function(e,r,n,t,i,a,u){return Q.ComplexNumber.isNumberLike(r)?Q.ComplexNumber.isNumberLike(n)?t(r,n):n instanceof Q.ComplexNumber?i(r,n):Q.error("Q.ComplexNumber attempted to",e,"with the number",r,"and something that is neither a Number or Q.ComplexNumber:",n):r instanceof Q.ComplexNumber?Q.ComplexNumber.isNumberLike(n)?a(r,n):n instanceof Q.ComplexNumber?u(r,n):Q.error("Q.ComplexNumber attempted to",e,"with the complex number",r,"and something that is neither a Number or Q.ComplexNumber:",n):Q.error("Q.ComplexNumber attempted to",e,"with something that is neither a Number or Q.ComplexNumber:",r)},sine:function(e){const r=e.real,n=e.imaginary;return new Q.ComplexNumber(Math.sin(r)*Q.hyperbolicCosine(n),Math.cos(r)*Q.hyperbolicSine(n))},cosine:function(e){const r=e.real,n=e.imaginary;return new Q.ComplexNumber(Math.cos(r)*Q.hyperbolicCosine(n),-Math.sin(r)*Q.hyperbolicSine(n))},arcCosine:function(e){const r=e.real,n=e.imaginary,t=Q.ComplexNumber.squareRoot(new Q.ComplexNumber(n*n-r*r+1,r*n*-2)),i=Q.ComplexNumber.log(new Q.ComplexNumber(t.real-n,t.imaginary+r));return new Q.ComplexNumber(Math.PI/2-i.imaginary,i.real)},arcTangent:function(e){const r=e.real,n=e.imaginary;if(0===r){if(1===n)return new Q.ComplexNumber(0,1/0);if(-1===n)return new Q.ComplexNumber(0,-1/0)}const t=r*r+(1-n)*(1-n),i=Q.ComplexNumber.log(new Q.ComplexNumber((1-n*n-r*r)/t,r/t*-2));return new Q.ComplexNumber(i.imaginary/2,i.real/2)},power:function(e,r){if(Q.ComplexNumber.isNumberLike(e)&&(e=new Q.ComplexNumber(e)),Q.ComplexNumber.isNumberLike(r)&&(r=new Q.ComplexNumber(r)),r.isZero())return Q.ComplexNumber.ONE;if(e.isZero()&&r.real>0&&r.imaginary>=0)return Q.ComplexNumber.ZERO;if(0===r.imaginary){if(e.real>=0&&0===e.imaginary)return new Q.ComplexNumber(Math.pow(e.real,r.real),0);if(0===e.real)switch((r.real%4+4)%4){case 0:return new Q.ComplexNumber(Math.pow(e.imaginary,r.real),0);case 1:return new Q.ComplexNumber(0,Math.pow(e.imaginary,r.real));case 2:return new Q.ComplexNumber(-Math.pow(e.imaginary,r.real),0);case 3:return new Q.ComplexNumber(0,-Math.pow(e.imaginary,r.real))}}const n=Math.atan2(e.imaginary,e.real),t=Q.logHypotenuse(e.real,e.imaginary),i=Math.exp(r.real*t-r.imaginary*n),a=r.imaginary*t+r.real*n;return new Q.ComplexNumber(i*Math.cos(a),i*Math.sin(a))},squareRoot:function(e){const r=new Q.ComplexNumber(0,0),n=Q.ComplexNumber.absolute(e);return e.real>=0?0===e.imaginary?r.real=Math.sqrt(e.real):r.real=Math.sqrt(2*(n+e.real))/2:r.real=Math.abs(e.imaginary)/Math.sqrt(2*(n-e.real)),e.real<=0?r.imaginary=Math.sqrt(2*(n-e.real))/2:r.imaginary=Math.abs(e.imaginary)/Math.sqrt(2*(n+e.real)),e.imaginary<0&&(r.imaginary*=-1),r},log:function(e){return new Q.ComplexNumber(Q.logHypotenuse(e.real,e.imaginary),Math.atan2(e.imaginary,e.real))},multiply:function(e,r){return Q.ComplexNumber.operate("multiply",e,r,function(e,r){return new Q.ComplexNumber(e*r)},function(e,r){return new Q.ComplexNumber(e*r.real,e*r.imaginary)},function(e,r){return new Q.ComplexNumber(e.real*r,e.imaginary*r)},function(e,r){const n=e.real*r.real,t=e.real*r.imaginary,i=e.imaginary*r.real,a=e.imaginary*r.imaginary*-1;return new Q.ComplexNumber(n+a,t+i)})},divide:function(e,r){return Q.ComplexNumber.operate("multiply",e,r,function(e,r){return new Q.ComplexNumber(e/r)},function(e,r){return new Q.ComplexNumber(e).divide(r)},function(e,r){return new Q.ComplexNumber(e.real/r,e.imaginary/r)},function(e,r){const n=r.conjugate(),t=e.multiply(n),i=r.multiply(n).real;return t.divide(i)})},add:function(e,r){return Q.ComplexNumber.operate("add",e,r,function(e,r){return new Q.ComplexNumber(e+r)},function(e,r){return new Q.ComplexNumber(r.real+e,r.imaginary)},function(e,r){return new Q.ComplexNumber(e.real+r,e.imaginary)},function(e,r){return new Q.ComplexNumber(e.real+r.real,e.imaginary+r.imaginary)})},subtract:function(e,r){return Q.ComplexNumber.operate("subtract",e,r,function(e,r){return new Q.ComplexNumber(e+r)},function(e,r){return new Q.ComplexNumber(r.real-e,r.imaginary)},function(e,r){return new Q.ComplexNumber(e.real-r,e.imaginary)},function(e,r){return new Q.ComplexNumber(e.real-r.real,e.imaginary-r.imaginary)})}}),Q.ComplexNumber.createConstants("ZERO",new Q.ComplexNumber(0,0),"ONE",new Q.ComplexNumber(1,0),"E",new Q.ComplexNumber(Math.E,0),"PI",new Q.ComplexNumber(Math.PI,0),"I",new Q.ComplexNumber(0,1),"EPSILON",new Q.ComplexNumber(Q.EPSILON,Q.EPSILON),"INFINITY",new Q.ComplexNumber(1/0,1/0),"NAN",new Q.ComplexNumber(NaN,NaN)),Object.assign(Q.ComplexNumber.prototype,{clone:function(){return new Q.ComplexNumber(this.real,this.imaginary)},reduce:function(){return 0===this.imaginary?this.real:this},isNaN:function(e){return Q.ComplexNumber.isNaN(this)},isZero:function(e){return Q.ComplexNumber.isZero(this)},isFinite:function(e){return Q.ComplexNumber.isFinite(this)},isInfinite:function(e){return Q.ComplexNumber.isInfinite(this)},isEqualTo:function(e){return Q.ComplexNumber.areEqual(this,e)},absolute:function(){return Q.ComplexNumber.absolute(this)},conjugate:function(){return Q.ComplexNumber.conjugate(this)},power:function(e){return Q.ComplexNumber.power(this,e)},squareRoot:function(){return Q.ComplexNumber.squareRoot(this)},log:function(){return Q.ComplexNumber.log(this)},multiply:function(e){return Q.ComplexNumber.multiply(this,e)},divide:function(e){return Q.ComplexNumber.divide(this,e)},add:function(e){return Q.ComplexNumber.add(this,e)},subtract:function(e){return Q.ComplexNumber.subtract(this,e)},toText:function(e){"number"!=typeof e&&(e=16);const r=this.reduce(),n=Math.abs(r.imaginary);return Q.ComplexNumber.isNumberLike(r)?""+Q.round(r,e):0===r.real?1===r.imaginary?"i":-1===r.imaginary?"-i":r.imaginary.toFixed(e)+"i":r.real.toFixed(e)+" "+(r.imaginary>=0?"+":"-")+" "+(1===n?"i":Q.round(n,e)+"i")},copy$:function(e){return e instanceof Q.ComplexNumber!=!0?Q.error(`Q.ComplexNumber attempted to copy something that was not a complex number in to this complex number #${this.index}.`,this):(this.real=e.real,this.imaginary=e.imaginary,this)},conjugate$:function(){return this.copy$(this.conjugate())},power$:function(e){return this.copy$(this.power(e))},squareRoot$:function(){return this.copy$(this.squareRoot())},log$:function(){return this.copy$(this.log())},multiply$:function(e){return this.copy$(this.multiply(e))},divide$:function(e){return this.copy$(this.divide(e))},add$:function(e){return this.copy$(this.add(e))},subtract$:function(e){return this.copy$(this.subtract(e))}});
Q.Matrix=function(){this.index=Q.Matrix.index++;let t=null,r=!1;if(this.rows=Array.from(arguments),this.rows.forEach(function(n){n instanceof Array!=!0&&(n=[n]),null===t?t=n.length:t!==n.length&&(r=!0)}),r)return Q.error(`Q.Matrix found upon initialization that matrix#${this.index} row lengths were not equal. You are going to have a bad time.`,this);const n=this;this.columns=[];for(let r=0;r<t;r++){const t=[];for(let i=0;i<this.rows.length;i++){const e=n.rows[i][r];if("number"==typeof e)n.rows[i][r]=new Q.ComplexNumber(e);else if(e instanceof Q.ComplexNumber==!1)return Q.error(`Q.Matrix found upon initialization that matrix#${this.index} contained non-quantitative values. A+ for creativity, but F for functionality.`,this);Object.defineProperty(t,i,{get:function(){return n.rows[i][r]},set:function(t){n.rows[i][r]=t}})}this.columns.push(t)}},Object.assign(Q.Matrix,{index:0,help:function(){return Q.help(this)},constants:{},createConstant:Q.createConstant,createConstants:Q.createConstants,isMatrixLike:function(t){return t instanceof this||this.prototype.isPrototypeOf(t)},isWithinRange:function(t,r,n){return"number"==typeof t&&t>=r&&t<=n&&t==parseInt(t)},getWidth:function(t){return t.columns.length},getHeight:function(t){return t.rows.length},haveEqualDimensions:function(t,r){return t.rows.length===r.rows.length&&t.columns.length===r.columns.length},createSquare:function(t,r){"number"!=typeof t&&(t=2),"function"!=typeof r&&(r=function(){return 0});const n=[];for(let i=0;i<t;i++){const e=[];for(let n=0;n<t;n++)e.push(r(n,i));n.push(e)}return new Q.Matrix(...n)},createZero:function(t){return new Q.Matrix.createSquare(t)},createOne:function(t){return new Q.Matrix.createSquare(t,function(){return 1})},createIdentity:function(t){return new Q.Matrix.createSquare(t,function(t,r){return t===r?1:0})},from:function(t){"string"!=typeof t&&(t="Array"),t=t.toLowerCase();const r=Q.Matrix["from"+t];return"function"!=typeof r?Q.error(`Q.Matrix could not find an importer for “${t}” data.`):r()},fromArray:function(t){return new Q.Matrix(...t)},fromXsv:function(t,r,n){"string"!=typeof r&&(r="\n"),"string"!=typeof n&&(n="\t");const i=t.split(r),e=[];return i.forEach(function(t){if(""===(t=t.trim()))return;const r=[];t.split(n).forEach(function(t){r.push(parseFloat(t))}),e.push(r)}),new Q.Matrix(...e)},fromCsv:function(t){return Q.Matrix.fromXsv(t.replace(/\r/g,"\n"),"\n",",")},fromTsv:function(t){return Q.Matrix.fromXsv(t,"\n","\t")},fromHtml:function(t){return Q.Matrix.fromXsv(t.replace(/\r?\n|\r|<tr>|<td>/g,"").replace(/<\/td>(\s*)<\/tr>/g,"</tr>").match(/<table>(.*)<\/table>/i)[1],"</tr>","</td>")},add:function(t,r){return!0!==Q.Matrix.isMatrixLike(t)||!0!==Q.Matrix.isMatrixLike(r)?Q.error("Q.Matrix attempted to add something that was not a matrix."):!0!==Q.Matrix.haveEqualDimensions(t,r)?Q.error(`Q.Matrix cannot add matrix#${t.index} of dimensions ${t.columns.length}x${t.rows.length} to matrix#${r.index} of dimensions ${r.columns.length}x${r.rows.length}.`):new Q.Matrix(...t.rows.reduce(function(t,n,i){return t.push(n.reduce(function(t,n,e){return t.push(n.add(r.rows[i][e])),t},[])),t},[]))},multiplyScalar:function(t,r){return!0!==Q.Matrix.isMatrixLike(t)?Q.error("Q.Matrix attempted to scale something that was not a matrix."):"number"!=typeof r?Q.error(`Q.Matrix attempted to scale this matrix#${t.index} by an invalid scalar: ${r}.`):new Q.Matrix(...t.rows.reduce(function(t,n){return t.push(n.reduce(function(t,n){return t.push(n.multiply(r)),t},[])),t},[]))},multiply:function(t,r){if(!0!==Q.Matrix.isMatrixLike(t)||!0!==Q.Matrix.isMatrixLike(r))return Q.error("Q.Matrix attempted to multiply something that was not a matrix.");if(t.columns.length!==r.rows.length)return Q.error(`Q.Matrix attempted to multiply Matrix#${t.index}(cols==${t.columns.length}) by Matrix#${r.index}(rows==${r.rows.length}) but their dimensions were not compatible for this.`);const n=[];return t.rows.forEach(function(t){const i=[];r.columns.forEach(function(r){const n=new Q.ComplexNumber;r.forEach(function(r,i){n.add$(t[i].multiply(r))}),i.push(n)}),n.push(i)}),new this(...n)},multiplyTensor:function(t,r){if(!0!==Q.Matrix.isMatrixLike(t)||!0!==Q.Matrix.isMatrixLike(r))return Q.error("Q.Matrix attempted to tensor something that was not a matrix.");const n=[],i=t.columns.length*r.columns.length,e=t.rows.length*r.rows.length;for(let o=0;o<e;o++){const e=[];for(let n=0;n<i;n++){const i=Math.floor(n/t.columns.length),a=Math.floor(o/t.rows.length),s=n%r.columns.length,u=o%r.rows.length;e.push(t.rows[a][i].multiply(r.rows[u][s]))}n.push(e)}return new Q.Matrix(...n)}}),Object.assign(Q.Matrix.prototype,{isValidRow:function(t){return Q.Matrix.isWithinRange(t,0,this.rows.length-1)},isValidColumn:function(t){return Q.Matrix.isWithinRange(t,0,this.columns.length-1)},isValidAddress:function(t,r){return this.isValidRow(r)&&this.isValidColumn(t)},getWidth:function(){return Q.Matrix.getWidth(this)},getHeight:function(){return Q.Matrix.getHeight(this)},read:function(t,r){return this.isValidAddress(t,r)?this.rows[r][t]:Q.error(`Q.Matrix could not read from cell address (x=${t}, y=${r}) in matrix#${this.index}.`,this)},clone:function(){return new Q.Matrix(...this.rows)},toArray:function(){return this.rows},toXsv:function(t,r){return this.rows.reduce(function(n,i){return n+t+i.reduce(function(t,n,i){return t+(i>0?r:"")+n.toText()},"")},"")},toCsv:function(){return this.toXsv("\n",",")},toTsv:function(){return this.toXsv("\n","\t")},toHtml:function(){return this.rows.reduce(function(t,r){return t+r.reduce(function(t,r){return t+"\n\t\t<td>"+r.toText()+"</td>"},"\n\t<tr>")+"\n\t</tr>"},"\n<table>")+"\n</table>"},write$:function(t,r,n){return this.isValidAddress(t,r)?"number"!=typeof n?Q.error(`Attempted to write an invalid value (${n}) to matrix#${this.index} at x=${t}, y=${r}`,this):(this.rows[r][t]=n,this):Q.error(`Invalid cell address for Matrix#${this.index}: x=${t}, y=${r}`,this)},copy$:function(t){if(!0!==Q.Matrix.isMatrixLike(t))return Q.error(`Q.Matrix attempted to copy something that was not a matrix in to this matrix#${t.index}.`,this);if(!0!==Q.Matrix.haveEqualDimensions(t,this))return Q.error(`Q.Matrix cannot copy matrix#${t.index} of dimensions ${t.columns.length}x${t.rows.length} in to this matrix#${this.index} of dimensions ${this.columns.length}x${this.rows.length} because their dimensions do not match.`,this);const r=this;return t.rows.forEach(function(t,n){t.forEach(function(t,i){r.rows[n][i]=t})}),this},fromArray$:function(t){return this.copy$(Q.Matrix.fromArray(t))},fromCsv$:function(t){return this.copy$(Q.Matrix.fromCsv(t))},fromTsv$:function(t){return this.copy$(Q.Matrix.fromTsv(t))},fromHtml$:function(t){return this.copy$(Q.Matrix.fromHtml(t))},add:function(t){return Q.Matrix.add(this,t)},multiplyScalar:function(t){return Q.Matrix.multiplyScalar(this,t)},multiply:function(t){return Q.Matrix.multiply(this,t)},multiplyTensor:function(t){return Q.Matrix.multiplyTensor(this,t)},add$:function(t){return this.copy$(this.add(t))},multiplyScalar$:function(t){return this.copy$(this.multiplyScalar(t))}}),Q.Matrix.createConstants("IDENTITY_2X2",Q.Matrix.createIdentity(2),"IDENTITY_3X3",Q.Matrix.createIdentity(3),"IDENTITY_4X4",Q.Matrix.createIdentity(4),"CONSTANT0_2X2",new Q.Matrix([1,1],[0,0]),"CONSTANT1_2X2",new Q.Matrix([0,0],[1,1]),"NEGATION_2X2",new Q.Matrix([0,1],[1,0]),"TEST_MAP_9X9",new Q.Matrix([11,21,31,41,51,61,71,81,91],[12,22,32,42,52,62,72,82,92],[13,23,33,43,53,63,73,83,93],[14,24,34,44,54,64,74,84,94],[15,25,35,45,55,65,75,85,95],[16,26,36,46,56,66,76,86,96],[17,27,37,47,57,67,77,87,97],[18,28,38,48,58,68,78,88,98],[19,29,39,49,59,69,79,89,99]),"HADAMARD",new Q.Matrix([Math.SQRT1_2,Math.SQRT1_2],[Math.SQRT1_2,-Math.SQRT1_2]),"PAULI_X",new Q.Matrix([0,1],[1,0]),"PAULI_Y",new Q.Matrix([0,new Q.ComplexNumber(0,-1)],[new Q.ComplexNumber(0,1),0]),"PAULI_Z",new Q.Matrix([1,0],[0,-1]),"PHASE",new Q.Matrix([1,0],[0,new Q.ComplexNumber(0,1)]),"PI_8",new Q.Matrix([1,0],[0,Q.ComplexNumber.E.power(new Q.ComplexNumber(0,Math.PI/4))]),"CONTROLLED_NOT",new Q.Matrix([1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]),"SWAP",new Q.Matrix([1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]),"CONTROLLED_Z",new Q.Matrix([1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,-1]),"CONTROLLED_PHASE",new Q.Matrix([1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,new Q.ComplexNumber(0,1)]),"TOFFOLI",new Q.Matrix([1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,1,0]),"CONTROLLED_SWAP",new Q.Matrix([1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1]));
Q.Qubit=function(t,e,i,n){if(Q.Matrix.isMatrixLike(t)&&void 0===e?(e=t.rows[1][0],t=t.rows[0][0]):("number"==typeof t&&(t=new Q.ComplexNumber(t,0)),"number"==typeof e&&(e=new Q.ComplexNumber(e,0)),t instanceof Q.ComplexNumber!=!0&&(t=new Q.ComplexNumber(1,0)),e instanceof Q.ComplexNumber!=!0&&(e=Q.ComplexNumber.ONE.subtract(Math.pow(t.absolute(),2)).squareRoot())),Math.pow(t.absolute(),2)+Math.pow(e.absolute(),2)-1>Q.EPSILON)return Q.error(`Q.Qubit could not accept the initialization values of a=${t} and b=${e} because their squares do not add up to 1.`);if(Q.Matrix.call(this,[t],[e]),this.index=Q.Qubit.index++,Object.defineProperty(this,"bra",{get:function(){return this.rows[0][0]},set:function(t){this.rows[0][0]=t}}),Object.defineProperty(this,"ket",{get:function(){return this.rows[1][0]},set:function(t){this.rows[1][0]=t}}),"string"==typeof i&&(this.label=i),"string"==typeof n&&(this.name=n),void 0===this.label||void 0===this.name){const i=Object.values(Q.Qubit.constants).find(function(i){return t.isEqualTo(i.bra)&&e.isEqualTo(i.ket)});void 0===i?(this.label="?",this.name="Unnamed"):(void 0===this.label&&(this.label=i.label),void 0===this.name&&(this.name=i.name))}},Q.Qubit.prototype=Object.create(Q.Matrix.prototype),Q.Qubit.prototype.constructor=Q.Qubit,Object.assign(Q.Qubit,{index:0,help:function(){return Q.help(this)},constants:{},createConstant:Q.createConstant,createConstants:Q.createConstants,findByKet:function(t){return t instanceof Q.ComplexNumber==!1&&(t=new Q.ComplexNumber(t)),Object.values(Q.Qubit.constants).find(function(e){return e.ket.isEqualTo(t)})},areEqual:function(t,e){return t.bra.isEqualTo(t.bra)&&e.ket.isEqualTo(e.ket)},collapse:function(t){const e=Math.pow(t.bra.absolute(),2),i=(Math.pow(t.ket.absolute(),2),Math.pow(2,32)-1),n=new Uint32Array(1);return window.crypto.getRandomValues(n),n/i<=e?new Q.Qubit(1,0):new Q.Qubit(0,1)},applyGate:function(t,e){return e instanceof Q.Gate==!1?Q.error(`Q.Qubit attempted to apply something that was not a gate to this qubit #${t.index}.`):e.applyTo(t)},toText:function(t){return t.bra.toText()+"\n"+t.ket.toText()},toBlochSphere:function(t){const e=Q.ComplexNumber.arcCosine(t.bra).multiply(2);isNaN(e.real)&&(e.real=0),isNaN(e.imaginary)&&(e.imaginary=0);const i=Q.ComplexNumber.log(t.ket.divide(Q.ComplexNumber.sine(e.divide(2)))).divide(Q.ComplexNumber.I);isNaN(i.real)&&(i.real=0),isNaN(i.imaginary)&&(i.imaginary=0);const n={x:Q.ComplexNumber.sine(e).multiply(Q.ComplexNumber.cosine(i)).real,y:Q.ComplexNumber.sine(e).multiply(Q.ComplexNumber.sine(i)).real,z:Q.ComplexNumber.cosine(e).real},o={x:n.y,y:n.z,z:n.x};return{theta:e.real,phi:i.real,vector:n,position:o}},fromBlochVector:function(t,e,i){}}),Q.Qubit.createConstants("HORIZONTAL",new Q.Qubit(1,0,"H","Horizontal"),"VERTICAL",new Q.Qubit(0,1,"V","Vertical"),"DIAGONAL",new Q.Qubit(Math.SQRT1_2,Math.SQRT1_2,"D","Diagonal"),"ANTI_DIAGONAL",new Q.Qubit(Math.SQRT1_2,-Math.SQRT1_2,"A","Anti-diagonal"),"RIGHT_HAND_CIRCULAR_POLARIZED",new Q.Qubit(Math.SQRT1_2,new Q.ComplexNumber(0,-Math.SQRT1_2),"R","Right-hand Circular Polarized"),"LEFT_HAND_CIRCULAR_POLARIZED",new Q.Qubit(Math.SQRT1_2,new Q.ComplexNumber(0,Math.SQRT1_2),"L","Left-hand Circular Polarized")),Object.assign(Q.Qubit.prototype,{copy$:function(t){if(!0!==Q.Matrix.isMatrixLike(t))return Q.error(`Q.Qubit attempted to copy something that was not a matrix in this qubit #${qubit.index}.`,this);if(!0!==Q.Matrix.haveEqualDimensions(t,this))return Q.error(`Q.Qubit cannot copy matrix#${t.index} of dimensions ${t.columns.length}x${t.rows.length} in to this qubit #${this.index} of dimensions ${this.columns.length}x${this.rows.length} because their dimensions do not match.`,this);const e=this;return t.rows.forEach(function(t,i){t.forEach(function(t,n){e.rows[i][n]=t})}),this.dirac=t.dirac,this},isEqualTo:function(t){return Q.Qubit.areEqual(this,t)},collapse:function(){return Q.Qubit.collapse(this)},applyGate:function(t){return Q.Qubit.applyGate(this,t)},toText:function(){return Q.Qubit.toText(this)},toBlochSphere:function(){return Q.Qubit.toBlochSphere(this)},collapse$:function(){return this.copy$(Q.Qubit.collapse(this))},applyGate$:function(t){return this.copy$(Q.Qubit.applyGate(this,t))}});
Q.Gate=function(t,n,e){this.index=Q.Gate.index++,this.label="string"==typeof n?n:"g",this.name="string"==typeof e?e:"Unlabeled",this.applyTo="function"==typeof t?t:function(){Q.warn(`Gate #${this.index} (“${this.name}”) has no operation function.`)}},Object.assign(Q.Gate,{index:0,help:function(){return Q.help(this)},constants:{},createConstant:Q.createConstant,createConstants:Q.createConstants,findByLabel:function(t){return Object.values(Q.Gate.constants).find(function(n){return n.label.toUpperCase()===t.toUpperCase()})},findByName:function(t){return Object.values(Q.Gate.constants).find(function(t){return t.name.toUpperCase()===name.toUpperCase()})}}),Q.Gate.createConstants("IDENTITY",new Q.Gate(function(t){return t},"I","Identity"),"MEASURE",new Q.Gate(function(t){return t.collapse()},"M","Measure"),"HADAMARD",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.HADAMARD.multiply(t))},"H","Hadamard"),"PAULI_X",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.PAULI_X.multiply(t))},"X","Pauli X"),"PAULI_Y",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.PAULI_Y.multiply(t))},"Y","Pauli Y"),"PAULI_Z",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.PAULI_Z.multiply(t))},"Z","Pauli Z"),"PHASE",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.PHASE.multiply(t))},"S","Phase"),"PI_8",new Q.Gate(function(t){return new Q.Qubit(Q.Matrix.PI_8.multiply(t))},"T","π ÷ 8"),"CONTROLLED_NOT",new Q.Gate(function(t,n){const e=Q.Matrix.CONTROLLED_NOT.multiply(n.multiplyTensor(t));return[new Q.Qubit(e.rows[0][0],e.rows[1][0]),new Q.Qubit(e.rows[2][0],e.rows[3][0])]},"C","Controlled Not (C-Not)"),"BLOCH_SPHERE",new Q.Gate(function(t){},"B","Bloch Sphere visualizer")),Object.assign(Q.Gate.prototype,{clone:function(){return new Q.Gate(this.applyTo,this.label,this.name)},toText:function(){return`-${this.label}-`},toDiagram:function(){},toHtml:function(){return`<div class="gate">${this.label}</div>`}});
Q.Program=function(t,e){"number"!=typeof t&&(t=3),this.bandwidth=t,"number"!=typeof e&&(e=6),e+=1,this.timewidth=e,this.moments=new Array(e).fill(new Array(t).fill(Q.Qubit.HORIZONTAL,0,t),0,1);for(let e=1;e<this.moments.length;e++)this.moments[e]=new Array(t).fill(Q.Gate.IDENTITY,0,t)},Object.assign(Q.Program,{index:0,help:function(){return Q.help(this)},constants:{},createConstant:Q.createConstant,createConstants:Q.createConstants,fromText:function(t){void 0!==t.raw&&(t=""+t.raw);const e=t.split("\n").reduce(function(t,e){const n=e.trim();return n.length&&t.push(n.toUpperCase().split("")),t},[]),n=e.length,o=e[0].length;e.forEach(function(t,e){if(t.length!==o)return Q.error("Q.Program attempted to create a new program from text input but the amount of time implied in the submitted text is not consistent.")});const r=new Q.Program(n,o);return e.forEach(function(t,e){t.forEach(function(t,n){const o=new Q.Gate.findByLabel(t);if(o instanceof Q.Gate!=!0)return Q.error(`Q.Program attempted to create a new program from text input but could not identify this submitted gate: ${t}.`);r.set(n+1,e,o)})}),r},fromTextOLD:function(t){void 0!==t.raw&&(t=""+t.raw);const e=t.split("\n").reduce(function(t,e){const n=e.trim();return n.length&&t.push(n.replace(/--/g,"-").split("-")),t},[]),n=e.length,o=e[0].length,r=new Q.Program(n,o);return e.forEach(function(t,e){t.forEach(function(t,n){let o;"|"===t.substr(0,1)?(t=+t.substr(1,t.length-2),o=Q.Qubit.findByKet(t)):o=new Q.Gate.findByLabel(t),r.set(n,e,o)})}),r},copy:function(){},cut:function(){},paste:function(){},getMoment:function(){return{to:function(t){}}}}),Object.assign(Q.Program.prototype,{set:function(t,e,n){this.moments[t][e]=n},run:function(){const t=this.moments[0].slice(0);for(let e=1;e<this.timewidth;e++)for(let n=0;n<this.bandwidth;n++)t[n]=this.moments[e][n].applyTo(t[n]);for(let e=0;e<t.length;e++)t[e]=t[e].collapse().ket.toText();return"|"+t.join("")+"⟩"},toText:function(){const t=this,e=new Array(this.bandwidth).fill("");return this.moments.forEach(function(n,o){n.forEach(function(n,r){let i="";n instanceof Q.Qubit?i="|"+n.ket.toText()+"⟩":(i="-"+n.label,o<t.moments.length-1&&(i+="-")),e[r]+=i})}),e.join("\n")},toDiagram:function(){const t=this,e=new Array(3*this.bandwidth+1).fill("");return this.moments.forEach(function(n,o){0===o&&(e[0]="\n "),e[0]+="   t"+o,n.forEach(function(n,r){let i="",s="",a="";0===o&&(i="    ",s="q"+r+"  ",a="    "),n instanceof Q.Qubit?(i+="    ",s+="|"+n.ket.toText()+"⟩─",a+="    "):"I"===n.label?(i+="   ",s+="──○",a+="   ",o<t.moments.length-1&&(i+="  ",s+="──",a+="  ")):(i+="┌───┐",s+="┤ "+n.label+" ",a+="└───┘",o<t.moments.length-1?s+="├":s+="│"),e[3*r+1]+=i,e[3*r+2]+=s,e[3*r+3]+=a})}),e.join("\n")},toDom:function(){document.createElement("div").classList.add("program")}});var p=new Q.Program;p.set(0,0,Q.Qubit.HORIZONTAL),p.set(0,1,Q.Qubit.VERTICAL),p.set(0,2,Q.Qubit.VERTICAL),p.set(1,0,Q.Gate.HADAMARD),p.set(2,0,Q.Gate.PAULI_X),p.set(3,0,Q.Gate.PAULI_Y),p.set(4,0,Q.Gate.PAULI_Z),p.set(1,1,Q.Gate.HADAMARD),p.set(2,1,Q.Gate.PHASE),p.set(3,1,Q.Gate.PI_8),p.set(1,2,Q.Gate.HADAMARD);