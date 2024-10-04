const express = require('express');
require('dotenv').config()
const path = require('path');
const bodyParser = require('body-parser');
const { connect, getAllProducts, getAllMenProducts, getAllWomenProducts,
  getAllKidsProducts, getMenShirtProducts, getMenShortsProducts, getMenShoesProducts,
  getWomenShirtProducts, getWomenShortsProducts, getWomenShoesProducts, getKidClothingProducts,
  getKidShoesProducts, getKidAccessoryProducts, getProductById, insertUser, insertShopping ,
  getSaleProducts } = require('./config/db');
const app = express();
const PORT = 8900; 

connect();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/partials/header', (req, res) => {
  res.render('partials/header'); 
});

app.get('/partials/footer', (req, res) => {
  res.render('partials/footer'); 
});

app.use(express.static(path.join(__dirname, 'public')));


/**==== REGISTER ======= */
app.get('/register', (req, res) => {
    res.render('register'); 
});
app.post('/register', async (req, res) => {
  const { fname, lname, email, pwd } = req.body;

  try {
      await insertUser(fname, lname, email, pwd);
      console.log('User registered successfully');
      res.redirect('/home');
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/', async (req, res) => {
  getAllProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('home', { products: products });
  });
})

/**===== Product Page ======== */
app.get('/productPages', async (req, res) => {
  const productId = req.query.productId; // Assuming productId is obtained from request query parameters
  if (!productId) {
    res.status(400).send('Product ID is required');
    return;
  }
  getProductById(productId, (error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('productPages', { products: products });
  });
});
app.post('/addToCart', async (req, res) => {
  const productId = req.body.productId; // Assuming productId is sent in the request body
  if (!productId) {
    res.status(400).send('Product ID is required');
    return;
  }
  try {
    await insertShopping(productId);
    console.log('Added to cart successfully');
    res.redirect(`/productPages?productId=${productId}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


/*======= MEN =======*/
app.get('/allMen', async (req, res) => {
  getAllMenProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allMen', { products: products });
  });
})

app.get('/men-shirt', (req, res) => {
  getMenShirtProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('men-shirt', { products: products });
  });
})

app.get('/men-shorts', (req, res) => {
  getMenShortsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('men-shorts', { products: products });
  });
})

app.get('/men-shoes', (req, res) => {
  getMenShoesProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('men-shoes', { products: products });
  });
})

/*======= WOMEN =========*/
app.get('/allWomen', async (req, res) => {
  getAllWomenProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allWomen', { products: products });
  });
})
app.get('/women-shirt', (req, res) => {
  getWomenShirtProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('women-shirt', { products: products });
  });
})
app.get('/women-shorts', (req, res) => {
  getWomenShortsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('women-shorts', { products: products });
  });
})

app.get('/women-shoes', (req, res) => {
  getWomenShoesProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('women-shoes', { products: products });
  });
})

/**===== KIDS =======*/
app.get('/allKids', (req, res) => {
  getAllKidsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allKids', { products: products });
  });
})
app.get('/kids-shoes', (req, res) => {
  getKidShoesProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-shoes', { products: products });
  });
})
app.get('/kids-clothing', (req, res) => {
  getKidClothingProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-clothing', { products: products });
  });
})
app.get('/kids-accessory', (req, res) => {
  getKidAccessoryProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-accessory', { products: products });
  });
})


app.get('/loginMobile', (req, res) => {
  res.render('loginMobile');
})
app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/basket', (req, res) => {
  getSaleProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('basket', { products: products });
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
