const router = require("express").Router();
const {
  getProducts,
} = require("../controllers/products.controllers");

let products = [];

(async function () {
  products = await getProducts();
})();

router.get("/detail", async (req, res) => {
  const { productId } = req.query;

  const product = products.find(
    (elemento) => elemento.id === Number(productId)
  );
  res.render("details", { product: product });
});

module.exports = router;
