MI CANVAS QUE NO VOY A USAR

let pantalla = document.getElementById('canvas');
let pincel = canvas.getContext('2d');
pincel.canvas.width  = 500;
pincel.canvas.height = 600;

//var pantalla = document.querySelector ("canvas");
//var pincel = pantalla.getContext ("2d");

pincel.fillStyle = "#4a4063";
pincel.fillRect(0,0,600,400);

//cabeza
pincel.fillStyle = "white";
pincel.beginPath();
pincel.arc(300,115,35,0,2*3.14); 
pincel.fill();

//cuerpo
pincel.fillStyle = "white";
pincel.beginPath(); 
pincel.fillRect(285,150, 30, 120);

//brazo izquierdo
pincel.fillStyle = "white";
pincel.beginPath(); 
pincel.fillRect(320,150, 80, 20);

//brazo derecho
pincel.fillStyle = "white";
pincel.beginPath(); 
pincel.fillRect(200, 150, 80, 20);

//pierna der
pincel.fillStyle = "white";
pincel.beginPath(); 
pincel.fillRect(255, 270, 25, 80);

//pierna izqu
pincel.fillStyle = "white";
pincel.beginPath(); 
pincel.fillRect(320, 270, 25, 80);

//horca
pincel.fillStyle = "#DA6B33";
pincel.beginPath(); 
pincel.fillRect(80, 10, 30, 380);
pincel.fillRect(80, 10, 220, 30);
pincel.fillRect(285, 40, 30, 30);
pincel.fillRect(30, 360, 130, 30);
