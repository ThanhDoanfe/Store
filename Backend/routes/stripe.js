const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(200).json({
                    errCode: 1,
                    message: stripeErr
                });
            } else {
                return res.status(200).json({
                    errCode: 0,
                    message: stripeRes
                });
            }
        }
    );
});

module.exports = router;