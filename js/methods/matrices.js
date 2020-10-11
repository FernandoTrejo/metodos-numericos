function Crammer(matriz_n, matriz_resultados) {
  let determinante = math.det(matriz_n);
  if (determinante != 0) {
    let matriz_x = [];
    let i_x=0;
    for (let m of matriz_n) {
      let row = [matriz_resultados[i_x],m[1],m[2]];
      matriz_x.push(row);
      i_x++;
    }
    
    let matriz_y = [];
    let i_y = 0;
    for (let m of matriz_n) {
      let row = [m[0], matriz_resultados[i_y], m[2]];
      matriz_y.push(row);
      i_y++;
    }
    
    let matriz_z = [];
    let i_z = 0;
    for (let m of matriz_n) {
      let row = [m[0], m[1], matriz_resultados[i_z]];
      matriz_z.push(row);
      i_z++;
    }
    
    let det_x = math.det(matriz_x).toFixed(2);
    let det_y = math.det(matriz_y).toFixed(2);
    let det_z = math.det(matriz_z).toFixed(2);
    
    let response = [];
    response.push((det_x / determinante).toFixed(2));
    response.push((det_y / determinante).toFixed(2));
    response.push((det_z / determinante).toFixed(2));
    
    return response;
  }
  
  return null;
}

function Adjunta(matriz) {
  let determinante = math.det(matriz).toFixed(2);
  
  if(determinante != 0){
    let inversa = math.inv(matriz);
    
    let adjunta = math.multiply(inversa, determinante);
  
    return adjunta;
      
  }
  
  return null;
}