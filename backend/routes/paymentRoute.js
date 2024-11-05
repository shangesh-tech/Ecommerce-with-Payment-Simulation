const express = require("express");
const router = express.Router();

router.post("/checkout", (req, res) => {
    const { cartItems } = req.body;
  
    // Simulate payment success/failure (50%)
    const paymentSuccess = Math.random() > 0.5;
  
    if (paymentSuccess) {
      res.json({ success: true, message: "Payment successful!" });
    } else {
      res.json({ success: false, message: "Payment failed!" });
    }
});


module.exports = router;
