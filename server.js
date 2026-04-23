const express = require('express');
const app = express();

app.use(express.json());

// 📦 Lista de productos (ESTÁTICA)
let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Teclado", price: 45 }
];

// 📦 Obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// 🔍 Obtener producto por ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(product);
});

// ➕ Crear producto
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ❌ Eliminar producto
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Producto eliminado' });
});

// 🚀 Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});