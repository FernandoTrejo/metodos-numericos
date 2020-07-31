//main functions for the index.html to work

//variables globales
let formula = "";

function draw() {
  try {
    // compile the expression once
    const expression = document.getElementById('eq').value;
    const expr = math.compile(expression);

    // evaluate the expression repeatedly for different values of x
    const xValues = math.range(-10, 10, 0.5).toArray();
    const yValues = xValues.map(function(x) {
      return expr.evaluate({ x: x })
    });

    // render the plot using plotly
    const trace1 = {
      x: xValues,
      y: yValues,
      type: 'scatter'
    };
    
    const data = [trace1];
    Plotly.newPlot('plot', data);
    
    formula = expression;
    
    //limpiar tablaValores
    
    document.getElementById("tablaValores").innerHTML = '';
    document.getElementById("tablaMethod").innerHTML = '';
    document.getElementById("raiz").innerHTML = '';
    document.getElementById("numIteraciones").innerHTML = '';
  }
  catch (err) {
    console.error(err);
    alert(err);
  }
}

function createTable(inf, sup, step) {
  let table='<table class="table">'
    +'<thead>'
      +'<tr>'
        +'<th>x</th>'
        +'<th>y</th>'
      +'</tr>'
    +'</thead>'
    +'<tbody>';
    
    for(let i = inf; i <= sup; i+=step){
      let temp = formula.replace(/x/g,"("+i+")");
      table +='<tr><td>';
      table += i;
      table += '</td><td>';
      table += math.evaluate(temp).toFixed(6);
      table += '</td></tr>';
    }

  table+='</tbody></table>';
  
  return table;
}

function crearTabla(){
  try {
    let inf = document.getElementById("limInfTable").value;
    let sup = document.getElementById("limSupTable").value;
    let step = document.getElementById("step").value;
    
    if(inf == "" || sup == "" || step == "" || step == "0"){
      console.log("Valores vacios");
    }else{
      let table = createTable(Number(inf), Number(sup), Number(step));
      document.getElementById("tablaValores").innerHTML = table;
    }
  } catch (e) {
    console.log(e);
  }
}

draw();

//otras configuraciones
$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
  });
  $(".form-control").click(function() {
    $(this).parent().addClass("label-animate");
  });
  $(window).click(function() {
    if (!$(event.target).is('.form-control')) {
      $(".form-control").each(function() {
        if ($(this).val() == '') {
          $(this).parent().removeClass("label-animate");
        }
      });
    }
  });
});
