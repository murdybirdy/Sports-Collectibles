const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});
apiRouter.get("/unknown", async (req, res, next)=> {
  res.status(404).send({message:"404 not found"})
})

//Router: user 
const usersRouter = require('./users');
router.use('/users', usersRouter);

//Router: products 
const productsRouter = require('./products');
router.use('/products', productsRouter);
//Router: cart
const cartRouter = require('./cart');
router.use('/cart', cartRouter);




// place your routers here
  // /users
  // /products
  // /cart
// / nav bar?











{/* <div className = "App" > 
<Router>
  <Navbar />
  <Routes>
    <Route path = "/" />
    <Route path ="/users" />
    <Route path = "/cart" />
    <Route path = "/products" />
  </Routes>
</Router>

</div> */}


module.exports = apiRouter;
