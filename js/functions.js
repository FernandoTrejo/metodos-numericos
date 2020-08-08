//global and common functions 

function create_table_html(headers, data, colors = {}, classes = {}) {
  let is_there_colors = (Object.entries(colors).length === 0) ? false : true;
  let is_there_classes = (Object.entries(classes).length === 0) ? false : true;
  
  let columns = {};
  let rows = {};

  if (is_there_colors) {
    columns = colors.columns;
    rows = colors.rows;
  }

  let table = `<div class="table-responsive-md table-hover"><table class="table"><thead>`;
  table += (is_there_colors) ? `<tr style="${rows.thead}">` : `<tr>`;
  
  let str_headers = []; // para agregar argumentos en la funcion show_iteration_details
  let col_iterator = 0;
  
  for (let header of headers) {
    col_iterator++;
    str_headers.push(`'${header}'`);
    if(is_there_classes){
      if(classes.ids.includes(col_iterator)){
        table += `<th class="${classes.col_class}">${header}</th>`;
      }else{
        table += `<th>${header}</th>`;
      }
    }else{
      table += `<th>${header}</th>`;
    }
  }

  table += `</tr></thead><tbody>`;

  let row_iterator = 0;

  for (let row of data) {
    row_iterator++;

    if (is_there_colors) {
      let row_attributes = `data-toggle="modal" data-target="#details_iteration" onclick="show_iteration_details([${row}],[${str_headers.join()}])"`;
      
      table += (rows.ids.includes(row_iterator)) ? `<tr ${row_attributes} style="${rows.style}">` : `<tr ${row_attributes}>`;
    } else {
      table += `<tr>`;
    }

    col_iterator = 0;
    for (let value of row) {
      col_iterator++;
      
      let temp = ``;
      
      if(is_there_classes){
        if(classes.ids.includes(col_iterator)){
          temp += ` class="${classes.col_class}"`;
        }
      }
      
      if(is_there_colors){
        if(columns.ids.includes(col_iterator)){
          temp += ` style="${columns.style}"`;
        }
      }
    
      table += `<td${temp}>${value}</td>`;

    }
    table += `</tr>`;
  }

  table += `</tbody></table></div>`;

  return table;
}

function evaluate_expression(expression, variable, value) {
  try {
    let re = new RegExp(variable, "g");
    let new_expression = expression.replace(re, `(${value})`);
    return math.evaluate(new_expression);
  } catch (e) {
    console.log(e);
  }
}