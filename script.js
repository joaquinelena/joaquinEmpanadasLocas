

let carrito = [];


function verificarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && correo && telefono) {
        console.log("Todos los campos están completos.");
        return true;
    } else {
        console.log("Por favor completa todos los campos.");
        return false;
    }
}


document.querySelector('.contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (verificarFormulario()) {
        alert("Formulario enviado correctamente.");
        this.reset(); 
     }
});


async function cargarProductos() {
     const response = await fetch('./productos.json');
     
     if (!response.ok) throw new Error('Error al cargar los productos');

     const productos = await response.json();
     
     const cardContainer = document.querySelector('.card-container');
     
     productos.forEach(producto => {
         const card = document.createElement('div');
         card.classList.add('card');
         
         card.innerHTML = `
             <img src="${producto.imagen}" alt="${producto.nombre}">
             <h3>${producto.nombre}</h3>
             <p>Precio: $${producto.precio}</p>
             <button onclick='agregarAlCarrito("${producto.nombre}", ${producto.precio})'>Agregar al Carrito</button>`;
         
         cardContainer.appendChild(card);
     });
}


function agregarAlCarrito(nombre, precio) {
     carrito.push({ nombre, precio });
     document.getElementById('carrito-count').innerText = carrito.length || '0';
}


document.getElementById('verCarrito').addEventListener('click', function(event) {
     event.preventDefault(); 

     const modal = document.getElementById('carritoModal');
     const carritoItemsContainer = document.getElementById('carrito-items');
     const totalPriceElement = document.getElementById('total-price');

    
     carritoItemsContainer.innerHTML = '';
     
     let totalPrice = 0;

     
     carrito.forEach(item => {
         const itemDiv = document.createElement('div');
         itemDiv.textContent = `${item.nombre} - $${item.precio}`;
         carritoItemsContainer.appendChild(itemDiv);
         totalPrice += item.precio; 
     });

     totalPriceElement.textContent = totalPrice;

     modal.style.display = 'block'; 
});


document.querySelector('.close')?.addEventListener('click', function() {
      document.getElementById('carritoModal').style.display = 'none';
});


document.getElementById('clear-cart')?.addEventListener('click', function() {
      carrito = []; 
      document.getElementById('carrito-count').innerText = '0'; 
      document.getElementById('carrito-items').innerHTML = ''; 
      document.getElementById('total-price').textContent = '0'; 
      alert("Carrito limpiado.");
});


document.addEventListener('DOMContentLoaded', cargarProductos);