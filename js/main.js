//main functions for the index.html to work

//variables globales
let math_expression = "";

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

    math_expression = expression;

    //limpiar tablaValores

    document.getElementById("table_values").innerHTML = '';
    document.getElementById("table_iterations").innerHTML = '';
    document.getElementById("root").innerHTML = '';
    document.getElementById("iterations").innerHTML = '';

  }
  catch (err) {
    console.error(err);
    alert(err);
  }
}

function create_table_values() {
  try {
    let inf = document.getElementById("num_lim_inf_table").value;
    let sup = document.getElementById("num_lim_sup_table").value;
    let step = document.getElementById("num_step").value;

    if (inf == "" || sup == "" || step == "" || step == "0") {
      console.log("Valores vacios");
    } else {
      let data = [];
      for (let i = Number(inf); i <= Number(sup); i += Number(step)) {
        data.push([i, evaluate_expression(math_expression, "x", i)]);
      }
      
      let attributes = getAttributeObject();
      attributes.tab = {class: ["table","table-responsive-md", "table-hover"]};
      let table = create_table_html(["x", "f(x)"], data,attributes);
      document.getElementById("table_values").innerHTML = table;
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