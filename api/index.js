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
apiRouter.use('/users', usersRouter);

//Router: products 
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

//Router: cart
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);


//** ADD ERROR HANDLER HERE */
apiRouter.use((error, req, res, next) => {
  res.send(error);
})

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
