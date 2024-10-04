const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { db,getAllProducts, getAllMenProducts, getAllWomenProducts,
  getAllKidsProducts, getMenShirtProducts, getMenShortsProducts, getMenShoesProducts,
  getWomenShirtProducts, getWomenShortsProducts, getWomenShoesProducts, getKidClothingProducts,
  getKidShoesProducts, getKidAccessoryProducts, getProductById, insertUser, insertShopping ,
  getSaleProducts } = require('../config/db');
const router = express();

// app.use(express.static(path.join(__dirname, 'public')));


/**==== REGISTER ======= */
router.get('/register', (req, res) => {
    res.render('register'); 
});
router.post('/register', async (req, res) => {
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

router.get('/home', async (req, res) => {
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
router.get('/productPages', async (req, res) => {
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
router.post('/addToCart', async (req, res) => {
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
router.get('/allMen', async (req, res) => {
  getAllMenProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allMen', { products: products });
  });
})

router.get('/men-shirt', (req, res) => {
  getMenShirtProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('men-shirt', { products: products });
  });
})

router.get('/men-shorts', (req, res) => {
  getMenShortsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('men-shorts', { products: products });
  });
})

router.get('/men-shoes', (req, res) => {
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
router.get('/allWomen', async (req, res) => {
  getAllWomenProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allWomen', { products: products });
  });
})
router.get('/women-shirt', (req, res) => {
  getWomenShirtProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('women-shirt', { products: products });
  });
})
router.get('/women-shorts', (req, res) => {
  getWomenShortsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('women-shorts', { products: products });
  });
})

router.get('/women-shoes', (req, res) => {
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
router.get('/allKids', (req, res) => {
  getAllKidsProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('allKids', { products: products });
  });
})
router.get('/kids-shoes', (req, res) => {
  getKidShoesProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-shoes', { products: products });
  });
})
router.get('/kids-clothing', (req, res) => {
  getKidClothingProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-clothing', { products: products });
  });
})
router.get('/kids-accessory', (req, res) => {
  getKidAccessoryProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('kids-accessory', { products: products });
  });
})


router.get('/loginMobile', (req, res) => {
  res.render('loginMobile');
})
router.get('/contact', (req, res) => {
  res.render('contact');
})

router.get('/basket', (req, res) => {
  getSaleProducts((error, products) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('basket', { products: products });
  });
});


module.exports = router;