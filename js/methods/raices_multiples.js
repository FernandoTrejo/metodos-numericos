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