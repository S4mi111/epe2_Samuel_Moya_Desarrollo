var datosProductos = [];

// Se asegura que el contenido del DOM esté completamente cargado antes de ejecutar funciones
document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('epe2_json.json')
    .then(response => response.json())
    .then(datos => {
        datosProductos = datos;
        llenarDatos(datosProductos);
        llenarFiltros(datosProductos);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
}

function llenarDatos(datos) {
    var tabla = document.getElementById('productosTable').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar tabla existente
    datos.forEach(producto => {
        var fila = tabla.insertRow();
        fila.insertCell(0).innerHTML = producto.IdProducto;
        fila.insertCell(1).innerHTML = producto.NombreProducto;
        fila.insertCell(2).innerHTML = producto.Proveedor;
        fila.insertCell(3).innerHTML = producto.Categoría;
        fila.insertCell(4).innerHTML = producto.CantidadPorUnidad;
        fila.insertCell(5).innerHTML = producto.PrecioUnidad;
        fila.insertCell(6).innerHTML = producto.UnidadesEnExistencia;
        fila.insertCell(7).innerHTML = producto.UnidadesEnPedido;
        fila.insertCell(8).innerHTML = producto.NivelNuevoPedido;
        fila.insertCell(9).innerHTML = producto.Suspendido;
    });
}

function llenarFiltros(datos) {
    let proveedores = new Set();
    let categorias = new Set();

    datos.forEach(producto => {
        proveedores.add(producto.Proveedor);
        categorias.add(producto.Categoría);
    });

    var selectProveedor = document.getElementById('filtroProveedor');
    proveedores.forEach(proveedor => {
        var option = document.createElement('option');
        option.value = proveedor;
        option.textContent = proveedor;
        selectProveedor.appendChild(option);
    });

    var selectCategoria = document.getElementById('filtroCategoria');
    categorias.forEach(categoria => {
        var option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });
}

function filtrarProductos() {
    var filtroProv = document.getElementById('filtroProveedor').value;
    var filtroCat = document.getElementById('filtroCategoria').value;

    var datosFiltrados = datosProductos.filter(producto => {
        return (producto.Proveedor.includes(filtroProv) || filtroProv === '') &&
               (producto.Categoría.includes(filtroCat) || filtroCat === '');
    });

    llenarDatos(datosFiltrados);
}