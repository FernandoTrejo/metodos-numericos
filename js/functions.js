//global and common functions 

function create_table_html(headers, data, colors = {}) {
  let is_there_colors = (Object.entries(colors).length === 0) ? false : true;

  let columns = {};
  let rows = {};

  if (is_there_colors) {
    columns = colors.columns;
    rows = colors.rows;
  }

  let table = '<div class="table-responsive-sm"><table class="table"><thead>';
  table += (is_there_colors) ? '<tr style="' + rows.thead + '">' : '<tr>';

  for (let header of headers) {
    table += '<th>' + header + '</th>';
  }

  table += '</tr></thead><tbody>';

  let row_iterator = 0;
  let col_iterator = 0;

  for (let row of data) {
    row_iterator++;

    if (is_there_colors) {
      table += (rows.ids.includes(row_iterator)) ? '<tr style="' + rows.style + '">' : '<tr>';
    } else {
      table += '<tr>';
    }

    col_iterator = 0;
    for (let value of row) {
      col_iterator++;

      if (is_there_colors) {
        table += (columns.ids.includes(col_iterator)) ? '<td style="' + columns.style + '">' + value + '</td>' : '<td>' + value + '</td>';
      } else {
        table += '<td>' + value + '</td>';
      }
    }
    table += '</tr>';
  }

  table += '</tbody></table></div>';

  return table;
}

function evaluate_expression(expression, variable, value) {
  try {
    let re = new RegExp(variable, "g");
    let new_expression = expression.replace(re, '(' + value + ')');
    return math.evaluate(new_expression);
  } catch (e) {
    console.log(e);
  }
}