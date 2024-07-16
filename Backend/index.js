const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const productRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require('./routes/order.js');
const stripeRoute = require('./routes/stripe.js');
const mailRoute = require('./routes/mail.js');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connect to MongoDB successfully');
    })
    .catch(err => { console.log(err) });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/mail', mailRoute);

app.listen(process.env.PORT || 5000, () => {

})