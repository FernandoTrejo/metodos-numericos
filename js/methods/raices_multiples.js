function muller(x_0,x_1,expression,tolerance){
  let headers = ["i","X0","X1","X2","f(X0)","f(X1)","f(X2)","H0","H1","D0","D1","a","b","c","X3","Error"];
  let data = [];
  let i = 0;
  let last_root = 0;
  let root = 0;
  let error = 100;
  
  let x0 = 0;
  let x1 = x_0;
  let x2 = x_1;
  let result_x0 = 0;
  let result_x1 = 0;
  let result_x2 = 0;
  let h0 = 0;
  let h1 = 0;
  let d0 = 0;
  let d1 = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let x3 = (x1 + x2) / 2;
  
  while (error > tolerance) {
    i++;
    
    x0 = x1;
    x1 = x2;
    x2 = x3;
    result_x0 = evaluate_expression(expression, "x", x0);
    result_x1 = evaluate_expression(expression, "x", x1);
    result_x2 = evaluate_expression(expression, "x", x2);
    h0 = x1 - x0;
    h1 = x2 - x1;
    d0 = (result_x1 - result_x0) / h0;
    d1 = (result_x2 - result_x1) / h1;
    a = (d1 - d0) / (h1 - h0);
    b = a * h1 + d1;
    c = result_x2;
    
    let sign = (b < 0) ? -1 : 1;
    x3 = x2 + (-2 * c) / (b + (math.sqrt(math.pow(b, 2) - 4 * a * c)) * sign);
    
    if(i == 1){
      data.push([i,x0,x1,x2,result_x0,result_x1,result_x2,h0,h1,d0,d1,a,b,c,x3,"--"]);
    }else{
      error = math.abs((x3 - x2)/x3 * 100);
      data.push([i,x0,x1,x2,result_x0,result_x1,result_x2,h0,h1,d0,d1,a,b,c,x3,error]);
    }
  }
  
  let result = {
    res_root: x3,
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
  
  let rad_muller = document.getElementById("rad_muller");
  
  if(rad_muller.checked){
    let tolerance = document.getElementById("mu_num_tolerance").value;
    let x1 = document.getElementById("mu_num_x1_method").value;
    let x2 = document.getElementById("mu_num_x2_method").value;
  
    if(validate_args(x1,x2,tolerance)){
      result = muller(Number(x1), Number(x2), math_expression, Number(tolerance));
      
      res_html = {
        mu_table_iterations: "",
        mu_root: "",
        mu_iterations: ""
      };
      columns_hid = [5,6,7,8,9,10,11,12,13,14,15];
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
  let rad_muller = document.getElementById("rad_muller");
  
  let button = document.getElementById("btn_calculate_root");
  
  let text = "";
  
  if(rad_muller.checked){
    text = "Calcular con Müller";
    //ocultar_divs('muller');
  }
  
  button.innerText = text;
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

//funcion obligatoria
function clear_all_divs() {
  document.getElementById("mu_root").innerHTML = '';
  document.getElementById("mu_iterations").innerHTML = '';
  document.getElementById("mu_table_iterations").innerHTML = '';
  document.getElementById("mu_num_x1_method").innerHTML = '';
  document.getElementById("mu_num_tolerance").innerHTML = '';
  document.getElementById("mu_num_x2_method").innerHTML = '';
}