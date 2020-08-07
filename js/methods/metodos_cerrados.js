function regula_falsi(a, b, expression, tolerance) {
  try {
    let error_iteration = 100;
    let headers = ["i", "xa", "xb", "f(xa)", "f(xb)", "xr", "f(xr)", "f(xa)f(xr)", "error"];
    let data = [];
    let i = 0;
    let root = 1;
    let last_root = 0;

    let expression_a = 0;
    let expression_b = 0;
    let expression_r = 0;
    let product = 0;

    while (error_iteration > tolerance) {
      i++;

      expression_a = evaluate_expression(expression, "x", a);
      expression_b = evaluate_expression(expression, "x", b);

      last_root = root;
      root = b - ((expression_b * (a - b)) / (expression_a - expression_b));
      expression_r = evaluate_expression(expression, "x", root)

      product = expression_a * expression_r;

      if (i > 1) {
        error_iteration = math.abs((root - last_root) / root) * 100;
        data.push([i, a.toFixed(6), b.toFixed(6), expression_a.toFixed(6), expression_b.toFixed(6), root.toFixed(6), expression_r.toFixed(6), product.toFixed(6), error_iteration.toFixed(6)]);
      } else {
        data.push([i, a.toFixed(6), b.toFixed(6), expression_a.toFixed(6), expression_b.toFixed(6), root.toFixed(6), expression_r.toFixed(6), product.toFixed(6), "---"]);
      }

      if (product > 0) {
        a = root;
      }
      if (product < 0) {
        b = root;
      }
    }

    let result = {
      res_root: root,
      res_iterations: i,
      res_error: error_iteration,
      table_headers: headers,
      table_data: data
    }

    return result;

  } catch (e) {
    console.log(e);
  }
}

function bissection(a, b, expression, tolerance) {
  try {
    let error_iteration = 100;
    let headers = ["i", "xa", "xb", "f(xa)", "xr", "f(xr)", "f(xa)f(xr)", "error"];
    let data = [];
    let i = 0;
    let root = 1;
    let last_root = 0;
    
    let expression_a = 0;
    let expression_r = 0;
    let product = 0;
    while (error_iteration > tolerance) {
      i++;
      
      expression_a = evaluate_expression(expression,"x",a);
      
      last_root = root;
      root = (a + b) / 2;
      expression_r = evaluate_expression(expression,"x",root)

      product = expression_a * expression_r;

      if (i > 1) {
        error_iteration = math.abs((root - last_root) / root) * 100;
        data.push([i, a.toFixed(6), b.toFixed(6), expression_a.toFixed(6), root.toFixed(6), expression_r.toFixed(6), product.toFixed(6), error_iteration.toFixed(6)]);
      }else{
        data.push([i, a.toFixed(6), b.toFixed(6), expression_a.toFixed(6), root.toFixed(6), expression_r.toFixed(6), product.toFixed(6), "---"]);
      }

      if (product > 0) {
        a = root;
      }
      if (product < 0) {
        b = root;
      }
    }
    
    let result = {
      res_root: root,
      res_iterations: i,
      res_error: error_iteration,
      table_headers: headers,
      table_data: data
    }
    
    return result;
    
  } catch (e) {
    console.log(e);
  }
}

function show_results(result) {
  let element;
  for(let idElement in result){
    element = document.getElementById(idElement);
    element.innerHTML = result[idElement];
  }
}

function calculate_root() {
  
  let a = document.getElementById("num_lim_inf_method").value;
  let b = document.getElementById("num_lim_sup_method").value;
  let tolerance = document.getElementById("num_tolerance").value;
  
  if (a == "" || b == "" || tolerance == "") {
    console.log("valores vacios")
  } else {
    try {
      let result;
      let column_root;
      
      //obtener metodo
      let rad_bissection = document.getElementById("rad_bissection");
      let rad_regula_falsi = document.getElementById("rad_regula_falsi");
      
      let method = (rad_bissection.checked) ? rad_bissection.value : rad_regula_falsi.value;
      switch (method) {
        case 'bissection':
          result = bissection(Number(a), Number(b), math_expression, Number(tolerance));
          column_root = 5;
          break;
        case 'regula_falsi':
          result = regula_falsi(Number(a), Number(b), math_expression, Number(tolerance));
          column_root = 6;
          break;
      }
      
      let last_row = result.table_data.length;
      
      let table_colors = {
        columns: {
            style: "background: lightgreen",
            ids: [column_root]
          },
          rows: {
            thead: "",
            style: "background: lightblue",
            ids: [last_row]
          }
      };
      
      let table = create_table_html(result.table_headers,result.table_data,table_colors);
      
      let res = {
        table_iterations: table,
        root: "<span><b>Raíz: </b>" + result.res_root + "</span>",
        iterations: "<span><b>Iteraciones:</b> " + result.res_iterations + "</span>"
      };
      show_results(res);
    } catch (e) {
      console.log(e);
    }
  }
}

/********************************************************/

function change_text_button() {
  let rad_bissection = document.getElementById("rad_bissection");
  let button = document.getElementById("btn_calculate_root");
  
  button.innerText = (rad_bissection.checked) ? 'Calcular con Bisección' : 'Calcular con Regula Falsi';
}
