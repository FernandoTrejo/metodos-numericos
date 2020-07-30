function bissection(a, b, formula, error){
  try {
    let err = 100;
    let i = 0;
    let raiz = 1;
    let raizAnt = 0;
    while (err > error) {
      i++;
    
      raizAnt = raiz;
      raiz = (a + b) / 2;
      console.log(raiz);
    
      let formula1 = formula.replace(/x/g, "("+a+")");
      let formula2 = formula.replace(/x/g, "("+raiz+")");
    
      let form1 = math.evaluate(formula1);
      let form2 = math.evaluate(formula2);
    
      let product = form1 * form2;
    
      if (i > 1) {
        err = math.abs((raiz - raizAnt) / raiz) * 100;
      }
    
      tablaIteraciones(i, a, b, raiz, form1, form2, product, err);
    
      if (product > 0) {
        a = raiz;
      }
      if (product < 0) {
        b = raiz;
      }
    }
    
    table += '</tbody></table>';
    mostrarResultados(raiz, i);
  } catch (e) {
    console.log(e);
  }
}

function mostrarResultados(raiz, ite){
  document.getElementById("tablaMethod").innerHTML = table;
  document.getElementById("raiz").innerHTML = "<span><b>Raíz:</b> " + raiz + "</span>";
  document.getElementById("numIteraciones").innerHTML = "<span><b>Iteraciones:</b> " + ite + "</span>";
  
    //colorear ultima fila
    let idRow = "row" + ite;
    document.getElementById(idRow).classList.add('lightblue-row');
}

function calcular(){
  table = '<table class="table">' +
    '<thead>' +
    '<tr>' +
    '<th>i</th>' +
    '<th>a</th>' +
    '<th>b</th>' +
    '<th>Xr</th>' +
    '<th>f(a)</th>' +
    '<th>f(Xr)</th>' +
    '<th>f(a)f(Xr)</th>' +
    '<th>error</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';
    
  let a = document.getElementById("limInfMethod").value;
  let b = document.getElementById("limSupMethod").value;
  let error = document.getElementById("error").value;
  
  if(a == "" || b == "" || error == ""){
    console.log("valores vacios")
  }else{
    try {
      bissection(Number(a), Number(b), formula, Number(error));
    } catch (e) {
      console.log(e);
    }
  }
  
}

let table = '';

function tablaIteraciones(i,a,b,xr,form1,form2,prod,err){
  let idRow = "row" + i;
  
  table += '<tr id="' + idRow + '"><td>';
  
  table += i;
  table += '</td><td>';
  
  table += a.toFixed(6);
  table += '</td><td>';
  
  table += b.toFixed(6);
  table += '</td><td style="background: lightgreen">';
  
  table += xr.toFixed(6);
  table += '</td><td>';
  
  table += form1.toFixed(6);
  table += '</td><td>';
  
  table += form2.toFixed(6);
  table += '</td><td>';
  
  table += prod.toFixed(6);
  table += '</td><td>';
  
  if(i>1){
    table += err.toFixed(6);
  }
  table += '</td></tr>';
}
