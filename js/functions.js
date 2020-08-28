//global and common functions 

function create_table_html(headers, data, attributes = {}) {
  let exist_attributes = (Object.entries(attributes).length === 0) ? false : true;
  
  //variables contenedor
  let tab_container = {};
  let tab_container_attr = '';
  
  //variables tabla
  let tab = {};
  let tab_attr = '';
  
  //variables headers
  let thead = {};
  let thead_attr = '';
  let str_headers = [];
  
  //variables para las columnas
  let cols_comm = {};
  let col_comm_attr = '';
  let cols_spec = {};
  let col_spec_attr = '';
  
  //variables para las filas
  let rows_comm = {};
  let row_comm_attr = '';
  let rows_spec = {};
  let row_spec_attr = '';
  
  //tabla html
  let table = '';

  if (exist_attributes) {
    /******ASIGNACION******/
    tab_container = attributes.tab_container;
    tab = attributes.tab;
    thead = attributes.thead;
    cols_comm = attributes.columns.comm;
    cols_spec = attributes.columns.spec;
    rows_comm = attributes.rows.comm;
    rows_spec = attributes.rows.spec;
    
    /******TABLA CONTENEDOR******/
    if(Object.entries(tab_container).length > 0){
      for (let attr in tab_container) {
        tab_container_attr += `${attr.replace(/_/g,'-')}="${tab_container[attr].join(" ")}" `;
      }
      tab_container_attr = tab_container_attr.trim();
    }
    
    /******TABLA******/
    if(Object.entries(tab).length > 0){
      for (let attr in tab) {
        tab_attr += `${attr.replace(/_/g,'-')}="${tab[attr].join(" ")}" `;
      }
      tab_attr = tab_attr.trim();
    }
    
    /******THEAD******/
    if(Object.entries(thead).length > 0){
      for (let attr in thead) {
        thead_attr += `${attr.replace(/_/g,'-')}="${thead[attr].join(" ")}" `;
      }
      thead_attr = thead_attr.trim();
    }
    
    /******COLUMNAS ESPECIFICAS******/
    let cols_exclude = [];
    if(Object.entries(cols_spec).length > 0){
      for (let attr in cols_spec) {
        if (attr != 'set') {
          col_spec_attr += `${attr.replace(/_/g,'-')}="${cols_spec[attr].join(" ")}`;
          if(cols_comm.hasOwnProperty(attr)){
            col_spec_attr += ` ` + cols_comm[attr].join(" ");
            cols_exclude.push(attr);
          }
          col_spec_attr += `" `;
        }
      }
    }
    
    /******COLUMNAS COMUNES******/
    if(Object.entries(cols_comm).length > 0){
      for(let attr in cols_comm){
        col_comm_attr += `${attr.replace(/_/g,'-')}="${cols_comm[attr].join(" ")}" `;
        if(!cols_exclude.includes(attr)){
          col_spec_attr += `${attr.replace(/_/g,'-')}="${cols_comm[attr].join(" ")}" `;
        }
      }
      col_spec_attr = col_spec_attr.trim();
      col_comm_attr = col_comm_attr.trim();
    }
    
    /******FILAS ESPECIFICAS******/
    let rows_exclude = [];
    if(Object.entries(rows_spec).length > 0){
      for (let attr in rows_spec) {
        if (attr != 'set') {
          row_spec_attr += `${attr.replace(/_/g,'-')}="${rows_spec[attr].join(" ")}`;
          if (rows_comm.hasOwnProperty(attr)) {
            row_spec_attr += ` ` + rows_comm[attr].join(" ");
            rows_exclude.push(attr);
          }
          row_spec_attr += `" `;
        }
      }
    }
    
    /******FILAS COMUNES******/
    if(Object.entries(rows_comm).length > 0){
      for (let attr in rows_comm) {
        row_comm_attr += `${attr.replace(/_/g,'-')}="${rows_comm[attr].join(" ")}" `;
        if(!rows_exclude.includes(attr)){
          row_spec_attr += `${attr.replace(/_/g,'-')}="${rows_comm[attr].join(" ")}" `;
        }
      }
      row_spec_attr = row_spec_attr.trim();
      row_comm_attr = row_comm_attr.trim();
    }
  }
  
  table += `<div ${tab_container_attr}><table ${tab_attr}><thead ${thead_attr}><tr>`;
  
  /******ENCABEZADOS******/
  let col_iterator = 0;
  let col_attr = ``;
  for (let header of headers) {
    col_iterator++;
    str_headers.push(`'${header}'`);
    
    if (exist_attributes) {
      if(cols_spec.set.includes(col_iterator)){
        col_attr = col_spec_attr;
      }else{
        col_attr = col_comm_attr;
      }
    } 
    table += `<th ${col_attr}>${header}</th>`
  }

  table += `</tr></thead><tbody>`;
  
  /******FILAS*******/
  let row_iterator = 0;
  let row_attr = ``;
  for (let row of data) {
    row_iterator++;
    if (exist_attributes) {
      if (rows_spec.set.includes(row_iterator)) {
        row_attr = row_spec_attr;
      } else {
        row_attr = row_comm_attr;
      }
    }
    row_attr = row_attr.replace('_args_',`[${row}],[${str_headers.join()}]`);
    table += `<tr ${row_attr}>`;
    
    col_iterator = 0;
    for (let value of row) {
      col_iterator++;

      col_attr = ``;
      if (exist_attributes) {
        if (cols_spec.set.includes(col_iterator)) {
          col_attr = col_spec_attr;
        } else {
          col_attr = col_comm_attr;
        }
      }
      table += `<td ${col_attr}>${value}</td>`

    }
    table += `</tr>`;
  }

  table += `</tbody></table></div>`;
  
  return table;
}

function getAttributeObject(){
  return {
    tab_container: {},
    tab: {},
    thead: {},
    rows: {
      comm: {},
      spec: {set:[]}
    },
    columns: {
      comm: {},
      spec: {set:[]}
    }
  };
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