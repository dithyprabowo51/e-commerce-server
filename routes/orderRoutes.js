const router = require('express').Router();
const OrderController = require('../controllers/OrderController');
const checkProductId = require('../middlewares/checkProdId');
const authentication = require('../middlewares/authentication');

router.get('/', authentication, OrderController.readOrderProduct);
router.post('/', authentication, checkProductId, OrderController.addOrderProduct);
router.patch('/addQuantity', authentication, checkProductId, OrderController.addQuantity);
router.patch('/reduceQuantity', authentication, checkProductId, OrderController.reduceQuantity);
router.delete('/', authentication, OrderController.deleteOrder);
router.delete('/deleteItem', authentication, checkProductId, OrderController.deleteItem);

module.exports = router;