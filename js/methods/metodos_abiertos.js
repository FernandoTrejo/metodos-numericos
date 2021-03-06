function punto_fijo(x,expression,tolerance){
  let previous_x = 0;
  let last_root = 0;
  let root = x;
  let i = 0;
  let error = 100;
  let data = [];
  let headers = ["i","Xi","x = f(x)","Error"];
  
  while(error > tolerance){
    i++;
    
    previous_x = root;
    root = evaluate_expression(expression,"x",previous_x);
    last_root = previous_x;
    
    error = math.abs((root - last_root)/root * 100); 
    
    if(i==1){
      data.push([i,previous_x,root,"--"]);
    }else{
      data.push([i,previous_x,root,error]);
    }
  }
  
  let result = {
    res_root: root,
    res_iterations: i,
    res_error: error,
    table_headers: headers,
    table_data: data
  }
  
  return result;
}

function newton_raphson(x,expression,derivative_expression,tolerance){
  let result_function = 0;
  let result_derivative = 0;
  let previous_x = 0;  
  let last_root = 0;
  let root = x;
  let i = 0;
  let error = 100;
  let data = [];
  let headers = ["i","Xn-1","y = f(Xn-1)","dy/dx","Xn","Error"];
  
  while (error > tolerance) {
    i++;
    
    previous_x = root;
    
    result_function = evaluate_expression(expression,"x",previous_x);
    result_derivative = evaluate_expression(derivative_expression,"x",previous_x);
    
    root = previous_x - (result_function/result_derivative);
    last_root = previous_x;
    
    error = math.abs((root - last_root)/root * 100); 
    
    if (i == 1) {
      data.push([i, previous_x,result_function,result_derivative, root, "--"]);
    } else {
      data.push([i, previous_x,result_function,result_derivative, root, error]);
    }
  }

  let result = {
    res_root: root,
    res_iterations: i,
    res_error: error,
    table_headers: headers,
    table_data: data
  }
  
  return result;  
}

function secante(previous_x,x,expression,tolerance){
  let result_function_root = 0;
  let result_function_last_root = 0;
  let diference = 0;
  let i = 0;
  let root = 0;
  let last_root = previous_x;
  let next_root = x;
  let error = 100;
  let data = [];
  let headers = ["i","Xi","f(Xi)","f(Xi-1)","Xi - Xi-1","Error"];
  
  while (error > tolerance) {
    i++;
    
    if (i == 1) {
      data.push([i,last_root, "--", "--", "--", "--"]);
    } else {
      root = next_root;
      
      result_function_root = evaluate_expression(expression,"x",root);
      result_function_last_root = evaluate_expression(expression,"x",last_root);
      diference = root - last_root;
      next_root = root - (result_function_root*diference / (result_function_root - result_function_last_root));
      
      error = math.abs((root - last_root)/root * 100);
      
      last_root = root;
      
      data.push([i, root, result_function_root, result_function_last_root, diference, error]);
    }
  }
  
  let result = {
    res_root: root,
    res_iterations: i,
    res_error: error,
    table_headers: headers,
    table_data: data
  }
  
  return result;
}

function show_results(result) {
  let element;
  for(let idElement in result){
    element = document.getElementById(idElement);
    element.innerHTML = result[idElement];
  }
}

function calculate_root() {
  let res_html = {};
  let result;
  let columns_hid;
  
  let rad_punto_fijo = document.getElementById("rad_punto_fijo");
  let rad_newton_raphson = document.getElementById("rad_newton_raphson");
  let rad_secante = document.getElementById("rad_secante");
  
  
  if(rad_secante.checked){
    let tolerance = document.getElementById("se_num_tolerance").value;
    let prev_x = document.getElementById("se_num_prev_x_method").value;
    let x = document.getElementById("se_num_x_method").value;
  
    if(validate_args(prev_x,x,tolerance)){
      result = secante(Number(prev_x), Number(x), math_expression, Number(tolerance));
      
      res_html = {
        se_table_iterations: "",
        se_root: "",
        se_iterations: ""
      };
      columns_hid = [2];
    }
  }
  
  if(rad_newton_raphson.checked){
    let tolerance = document.getElementById("nr_num_tolerance").value;
    let x = document.getElementById("nr_num_x_method").value;
    let derivative = document.getElementById("nr_txt_derivative_method").value;
    
    if(validate_args(x,derivative,tolerance)){
      result = newton_raphson(Number(x), math_expression, derivative, Number(tolerance));
      
      res_html = {
        nr_table_iterations: "",
        nr_root: "",
        nr_iterations: ""
      };
      columns_hid = [2];
    }
  }
  
  if(rad_punto_fijo.checked){
    let tolerance = document.getElementById("pf_num_tolerance").value;
    let x = document.getElementById("pf_num_x_method").value;
    let equation = document.getElementById("pf_txt_equation_method").value;
    
    if(validate_args(x,equation,tolerance)){
      result = punto_fijo(Number(x), equation, Number(tolerance));
      
      res_html = {
        pf_table_iterations: "",
        pf_root: "",
        pf_iterations: ""
      };
      columns_hid = [2];
    }
  }
  
  let last_row = result.table_data.length;
  
  let attributes = {
    tab_container: { style: ["overflow-x:auto"] },
    tab: { class: ["table", "table-responsive-md", "table-hover"] },
    thead: {},
    rows: {
      comm: {
        data_target: ["#details_iteration"],
        data_toggle: ["modal"],
        onclick: ["show_row_details(_args_)"]
      },
      spec: {
        set: [last_row],
        style: ["background: lightblue"]
      }
    },
    columns: {
      comm: {},
      spec: {
        set: columns_hid,
        class: ["d-none", "d-lg-table-cell"]
      }
    }
  };
  
  let table = create_table_html(result.table_headers, result.table_data, attributes);
  console.log(table)
  let arr = [
    table,
    "<span><b>Raíz: </b>" + result.res_root + "</span>",
    "<span><b>Iteraciones:</b> " + result.res_iterations + "</span>"
  ];
  
  let i = 0;
  for(let attr in res_html){
    res_html[attr] = arr[i]
    i++;
  }

  show_results(res_html);
        
}

function validate_args(first,second,tolerance){
  if(first == "" || second == "" || tolerance == ""){
    return false;
  }
  
  if(tolerance == "0" || tolerance == 0){
    return false;
  }
  
  return true;
}
/********************************************************/

function change_text_button() {
  let rad_punto_fijo = document.getElementById("rad_punto_fijo");
  let rad_newton_raphson = document.getElementById("rad_newton_raphson");
  let rad_secante = document.getElementById("rad_secante");
  
  let button = document.getElementById("btn_calculate_root");
  
  let text = "";
  
  if(rad_punto_fijo.checked){
    text = "Calcular con Punto Fijo";
    ocultar_divs('punto_fijo');
  }
  
  if(rad_newton_raphson.checked){
    text = "Calcular con Newton Raphson";
    ocultar_divs('newton_raphson');
  }
  
  if(rad_secante.checked){
    text = "Calcular con Secante";
    ocultar_divs('secante');
  }
  
  button.innerText = text;
}

function ocultar_divs(rad_checked){
  let div_punto_fijo = document.getElementById("div_punto_fijo");
  let div_newton_raphson = document.getElementById("div_newton_raphson");
  let div_secante = document.getElementById("div_secante");
  
  //results
  let pf_results = document.getElementById("pf_results");
  let nr_results = document.getElementById("nr_results");
  let se_results = document.getElementById("se_results");
  
  switch(rad_checked){
    case 'punto_fijo':
      div_secante.classList.add("d-none");
      div_newton_raphson.classList.add("d-none");
      div_punto_fijo.classList.remove("d-none");
      
      nr_results.classList.add("d-none");
      se_results.classList.add("d-none");
      pf_results.classList.remove("d-none");
      break;
    case 'newton_raphson':
      div_secante.classList.add("d-none");
      div_newton_raphson.classList.remove("d-none");
      div_punto_fijo.classList.add("d-none");
      
      nr_results.classList.remove("d-none");
      se_results.classList.add("d-none");
      pf_results.classList.add("d-none");
      break;
    case 'secante':
      div_secante.classList.remove("d-none");
      div_newton_raphson.classList.add("d-none");
      div_punto_fijo.classList.add("d-none");
      
      nr_results.classList.add("d-none");
      se_results.classList.remove("d-none");
      pf_results.classList.add("d-none");
      break;
  }
}

function check_derivative(){
  let auto = document.getElementById("nr_check_derivative");
  let txt_derivative = document.getElementById("nr_txt_derivative_method");
  
  if(auto.checked){
    txt_derivative.value = calculate_derivative(math_expression,"x");
    txt_derivative.setAttribute("readonly","true");
  }else{
    txt_derivative.removeAttribute("readonly");
  }
}

function show_row_details(row,headers) {
  let new_headers = ["Campo","Valor"];
  let new_data = [];
  let attributes = getAttributeObject();
  attributes.tab = {class: ["table","table-responsive-md", "table-hover"]};
  
  console.log(attributes);
  
  for(let i=0; i<row.length; i++){
    new_data.push([headers[i],row[i]]);
  }
  
  console.log(new_data);
  
  let table = create_table_html(new_headers,new_data,attributes);
  console.log(table);
  
  
  document.getElementById("iteration_table").innerHTML = table;
}

function clear_all_divs() {
  document.getElementById("pf_root").innerHTML = '';
  document.getElementById("pf_iterations").innerHTML = '';
  document.getElementById("pf_table_iterations").innerHTML = '';
  document.getElementById("pf_num_x_method").innerHTML = '';
  document.getElementById("pf_num_tolerance").innerHTML = '';
  document.getElementById("pf_txt_equation_method").innerHTML = '';
  
  
  document.getElementById("se_root").innerHTML = '';
  document.getElementById("se_iterations").innerHTML = '';
  document.getElementById("se_table_iterations").innerHTML = '';
  document.getElementById("se_num_prev_x_method").innerHTML = '';
  document.getElementById("se_num_x_method").innerHTML = '';
  document.getElementById("se_num_tolerance").innerHTML = '';
  
  
  document.getElementById("nr_root").innerHTML = '';
  document.getElementById("nr_iterations").innerHTML = '';
  document.getElementById("nr_table_iterations").innerHTML = '';
  document.getElementById("nr_num_x_method").innerHTML = '';
  document.getElementById("nr_num_tolerance").innerHTML = '';
  document.getElementById("nr_txt_derivative_method").innerHTML = '';
}