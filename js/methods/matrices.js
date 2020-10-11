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

function lu(matriz_n, matriz_resultados){
  let matriz_l = [];
  let matriz_u = [];
  
  let factor21 = Number(matriz_n[1][0]) / Number(matriz_n[0][0]);
  let factor31 = Number(matriz_n[2][0]) / Number(matriz_n[0][0]); 
  
  //matriz U
  matriz_u.push(matriz_n[0]);
  
  let row1 = [];
  for(let i = 0; i < 3; i++){
    row1.push(Number(matriz_n[1][i]) - factor21 * Number(matriz_n[0][i]));
  }
  matriz_u.push(row1);
  
  let row2 = [];
  for (let i = 0; i < 3; i++) {
    row2.push(Number(matriz_n[2][i]) - factor31 * Number(matriz_n[0][i]));
  }
  matriz_u.push(row2);
  
  let row3 = [];
  let factor32 = Number(matriz_u[2][1]) / Number(matriz_u[1][1]);
  for (let i = 0; i < 3; i++) {
    row3.push(Number(matriz_n[2][i]) - factor32 * Number(matriz_u[1][i]));
  }
  matriz_u[2] =row3;
  console.log("matriz u",matriz_u);
  //matriz L
  matriz_l = [
    [1,0,0],
    [factor21,1,0],
    [factor31,factor32,1]
  ];
  console.log("matriz_l", matriz_l);
  let d1 = Number(matriz_resultados[0]);
  let d2 = Number(matriz_resultados[1]) - Number(factor21 * d1)
  let d3 = Number(matriz_resultados[2]) - Number(factor31 * d1) - Number(factor32 * d2);
  
  console.log(d1,d2,d3)
  
  let z = d3 / Number(matriz_u[2][2]).toFixed(2);
  let y = (d2 - Number(matriz_u[1][2]) * z) / Number(matriz_u[1][1]);
  let x = (d1 - Number(matriz_u[0][2]) * z - Number(matriz_u[0][1]) * y) / Number(matriz_u[0][0]);
   
  console.log(x,y,z)
  return [x, y, z];
}
