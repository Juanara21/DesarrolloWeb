# Guia Para Crear Backend

Aquí te dejo una guía completa paso a paso para crear un backend con node.js, express, mysql y sequelize.

###### Instalación de las herramientas
###### Instala Node.js en tu computadora.

## Crea un directorio para tu proyecto y accede a él desde la terminal.

###### Ejecuta el siguiente comando en la terminal para crear un archivo package.json y así poder manejar las dependencias de tu proyecto:

bash
Copy code
`npm init -y`
###### Instala las dependencias necesarias para el proyecto ejecutando el siguiente comando:

bash
Copy code
``npm install express mysql2 sequelize dotenv`
express: un framework de Node.js para crear aplicaciones web.
mysql2: un driver de MySQL para Node.js.

sequelize: un ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos relacionales.

dotenv: una librería que permite cargar variables de entorno desde un archivo .env.
Crea un archivo .env en la raíz de tu proyecto para almacenar tus variables de entorno. Aquí puedes colocar tus credenciales de la base de datos, como el nombre de usuario, la contraseña, el host y el puerto. Ejemplo:
bash
Copy code
`DB_USERNAME=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=mydatabase`

## Configuración de la base de datos
Crea una base de datos en MySQL utilizando un cliente de MySQL, como phpMyAdmin o MySQL Workbench.

##### En el archivo config.json (que debes crear en el directorio config), configura las credenciales de la base de datos que acabas de crear. Aquí te dejo un ejemplo de cómo podría verse el archivo config.json:

json
Copy code
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "mydatabase",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "mydatabase_test",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "mydatabase_production",
    "host": "localhost",
    "dialect": "mysql"
  }
}
#### Creación de modelos
#### Crea un directorio models en la raíz de tu proyecto.
#### Crea un archivo Cliente.js en el directorio models. 
#### Aquí te dejo un ejemplo de cómo podría verse el modelo Cliente:

Modelo Cliente:

javascript
Copy code
`const { Model, DataTypes } = require('sequelize');`
`const sequelize = require('../config/database');`

`class Cliente extends Model {}`

`Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCliente: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  direccionCliente: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  telefonoCliente: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  correoCliente: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  passwordCliente: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'cliente'
});

module.exports = Cliente;
`

Modelo Venta:

javascript
Copy code
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./cliente');

class Venta extends Model {}

Venta.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaVenta: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  impuestos: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descuentos: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'venta'
});

Venta.belongsTo(Cliente);

module.exports = Venta;


Modelo ProductoVenta:

javascript
Copy code
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./producto');
const Venta = require('./venta');

class ProductoVenta extends Model {}

ProductoVenta.init({
  cantidad: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  precio: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  total: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'producto_venta'
});

ProductoVenta.belongsTo(Producto);
ProductoVenta.belongsTo(Venta);

module.exports = ProductoVenta;
`

Modelo TipoProducto:

javascript
Copy code
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TipoProducto extends Model {}

TipoProducto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'tipo_producto'
});

module.exports = TipoProducto;
`

Modelo Producto:

javascript
Copy code
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoProducto = require('./tipoProducto');

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stockMin: {
    type: DataTypes.FLOAT,
    allowNule: false
   }, {
  sequelize,
  modelName: 'producto'
});

module.exports = Producto;`

Para crear los controladores y rutas en Express, podemos seguir la siguiente estructura de carpetas:

- controllers
  - clientesController.js
  - ventasController.js
  - product_ventasController.js
  - tipoProductoController.js
  - productosController.js
- routes
  - clientes.js
  - ventas.js
  - product_ventas.js
  - tipoProducto.js
  - productos.js
  
Cada controlador se encargará de implementar la lógica necesaria para cada modelo y cada ruta se encargará de asociar una URL a un método en el controlador correspondiente. Aquí te dejo un ejemplo para cada uno:

clientesController.js:
`const { Cliente } = require('../models');`

// Obtener todos los clientes
`const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json({ clientes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};`

// Obtener un cliente por su id
`const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({
      where: { id }
    });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  const { nombreCliente, direccionCliente, telefonoCliente, correoCliente, passwordCliente } = req.body;
  try {
    const cliente = await Cliente.create({
      nombreCliente,
      direccionCliente,
      telefonoCliente,
      correoCliente,
      passwordCliente
    });
    res.status(201).json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombreCliente, direccionCliente, telefonoCliente, correoCliente, passwordCliente } = req.body;
  try {
    const cliente = await Cliente.findOne({
      where: { id }
    });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await cliente.update({
      nombreCliente,
      direccionCliente,
      telefonoCliente,
      correoCliente,
      passwordCliente
    });
    res.status(200).json({ cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un cliente existente
const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({
      where: { id }
    });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await cliente.destroy();
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
` Aquí te comparto los ejemplos de los controladores para los modelos que faltan:

Controlador para la tabla ventas:`

javascript
Copy code
const { Venta } = require('../models');

const crearVenta = async (req, res) => {
  try {
    const venta = await Venta.create(req.body);
    res.status(201).json(venta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear la venta.' });
  }
};

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll();
    res.json(ventas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener las ventas.' });
  }
};

module.exports = {
  crearVenta,
  obtenerVentas,
};
`

Controlador para la tabla Tiporproducto:

javascript
Copy code
`const { TipoProducto } = require('../models');

const crearTipoProducto = async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.create(req.body);
    res.status(201).json(tipoProducto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el tipo de producto.' });
  }
};

const obtenerTiposProducto = async (req, res) => {
  try {
    const tiposProducto = await TipoProducto.findAll();
    res.json(tiposProducto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los tipos de producto.' });
  }
};

module.exports = {
  crearTipoProducto,
  obtenerTiposProducto,
};

`
Controlador para la tabla productos:

javascript
Copy code`
const { Producto } = require('../models');

const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el producto.' });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
};
Controlador para la tabla product_ventas:

javascript
Copy code
const { ProductVenta } = require('../models');

const crearProductVenta = async (req, res) => {
  try {
    const productVenta = await ProductVenta.create(req.body);
    res.status(201).json(productVenta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el producto de venta.' });
  }
};

const obtenerProductosVentas = async (req, res) => {
  try {
    const productosVentas = await ProductVenta.findAll();
    res.json(productosVentas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los productos de venta.' });
  }
};

module.exports = {
  crearProductVenta,
  obtenerProductosVentas,
};
`
Es importante mencionar que estos son solo ejemplos y que los controladores pueden variar dependiendo de las necesidades específicas

Claro, a continuación te proporciono un ejemplo de las rutas para cada modelo:

Rutas para el modelo Cliente:

javascript
Copy code
`const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Ruta para obtener todos los clientes
router.get('/clientes', clientesController.obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/clientes/:id', clientesController.obtenerCliente);

// Ruta para crear un nuevo cliente
router.post('/clientes', clientesController.crearCliente);

// Ruta para actualizar un cliente existente
router.put('/clientes/:id', clientesController.actualizarCliente);

// Ruta para eliminar un cliente
router.delete('/clientes/:id', clientesController.eliminarCliente);

module.exports = router;

`
Rutas para el modelo Venta:

javascript
Copy code`
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Ruta para obtener todas las ventas
router.get('/ventas', ventasController.obtenerVentas);

// Ruta para obtener una venta por su ID
router.get('/ventas/:id', ventasController.obtenerVenta);

// Ruta para crear una nueva venta
router.post('/ventas', ventasController.crearVenta);

// Ruta para actualizar una venta existente
router.put('/ventas/:id', ventasController.actualizarVenta);

// Ruta para eliminar una venta
router.delete('/ventas/:id', ventasController.eliminarVenta);

module.exports = router;

`
Rutas para el modelo Producto_Venta:

javascript
Copy code`
const express = require('express');
const router = express.Router();
const productoVentaController = require('../controllers/productoVentaController');

// Ruta para obtener todos los productos de una venta
router.get('/ventas/:id/productos', productoVentaController.obtenerProductosVenta);

// Ruta para agregar un producto a una venta
router.post('/ventas/:id/productos', productoVentaController.agregarProductoVenta);

// Ruta para actualizar la cantidad de un producto en una venta
router.put('/ventas/:id/productos/:idProducto', productoVentaController.actualizarCantidadProductoVenta);

// Ruta para eliminar un producto de una venta
router.delete('/ventas/:id/productos/:idProducto', productoVentaController.eliminarProductoVenta);

module.exports = router;

`
Rutas para el modelo TipoProducto:

javascript
Copy code`
const express = require('express');
const router = express.Router();
const tipoProductoController = require('../controllers/tipoProductoController');

// Ruta para obtener todos los tipos de producto
router.get('/tipos-producto', tipoProductoController.obtenerTiposProducto);

// Ruta para obtener un tipo de producto por su ID
router.get('/tipos-producto/:id', tipoProductoController.obtenerTipoProducto);

// Ruta para crear un nuevo tipo de producto
router.post('/tipos-producto', tipoProductoController.crearTipoProducto);

// Ruta para actualizar un tipo de producto existente
router.put('/tipos-producto/:id', tipoProductoController.actualizarTipoProducto);

// Ruta para eliminar un tipo de producto
router.delete('/tipos-producto/:id', tipoProductoController.eliminarTipoProducto);

module.exports = router;

`
Rutas para el modelo Producto:
`
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para el modelo de Producto
router.get('/productos', productoController.getProductos);
router.get('/productos/:id', productoController.getProductoById);
router.post('/productos', productoController.createProducto);
router.put('/productos/:id', productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);
`
por ultimo necesito que me crees el archivo server, donde se lanza todas las rutas y se sincroniza la base de datos 


Claro, aquí te muestro un ejemplo de cómo podrías crear el archivo server.js:
`

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { sequelize } = require('./models');

// Importar rutas
const clienteRouter = require('./routes/cliente');
const ventaRouter = require('./routes/venta');
const tipoProductoRouter = require('./routes/tipoProducto');
const productoRouter = require('./routes/producto');
const productoVentaRouter = require('./routes/productoVenta');

// Middlewares
app.use(express.json());

// Rutas
app.use('/clientes', clienteRouter);
app.use('/ventas', ventaRouter);
app.use('/tipos-producto', tipoProductoRouter);
app.use('/productos', productoRouter);
app.use('/producto-venta', productoVentaRouter);

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('La base de datos se ha sincronizado correctamente.');
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch((error) => {
  console.log(`Error al sincronizar la base de datos: ${error.message}`);
});`
En este archivo, se importan las rutas definidas previamente y se utilizan con el método app.use(). También se define un middleware para parsear el cuerpo de las solicitudes como JSON.

Luego, se llama al método sequelize.sync() para sincronizar la base de datos con los modelos definidos en la aplicación. Si la sincronización es exitosa, se inicia el servidor y se escucha en el puerto especificado. En caso de que ocurra algún error, se muestra un mensaje en la consola.

Espero que esta información te sea de ayuda.

