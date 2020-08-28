function punto_fijo(x,expression,tolerance){
  let previous_x = 0;
  let last_root = 0;
  let root = x;
  let i = 0;
  let error = 100;
  let data = [];
  let headers = ["i","Xi","Xr","Error"];
  
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
  let headers = ["i","Xn-1","f(Xn-1)","f'(Xn-1)","Xn","Error"];
  
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