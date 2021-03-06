const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require("./models/wood");
const { Product } = require('./models/product');

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require('./middleware/admin');

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Enable cross domain script
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// ====================
//        PRODUCTS
// ====================
app.post('/api/product/shop', (req, res) => {
    const request = req.body;
    let order = request.order ? request.order : 'desc';
    let sortBy = request.sortBy ? request.sortBy : '_id';
    let limit = request.limit ? parseInt(request.limit) : 100;
    let skip = parseInt(request.skip);
    let findArgs = {};

    for(let key in request.filters) {
        if(request.filters[key].length > 0) {
            if(key === 'price') {
                findArgs[key] = {
                    $gte: request.filters[key][0],
                    $lte: request.filters[key][1]
                }
            } else {
                findArgs[key] = request.filters[key];
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    skip(skip).
    limit(limit).
    exec((err, articles) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        });
    });
});



app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            article: doc
        });
    });
});

app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if(type === 'array') {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }

    Product.find({ '_id': {$in: items} }).populate('brand').populate('wood').exec((err, docs) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send(docs)
    });
});

app.get('/api/product/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().populate('brand').populate('wood').sort([[sortBy, order]]).limit(limit).exec((err, articles) => {
        if(err) return res.status(400).send(err);
        res.send(articles);
    });
});

// ====================
//        WOODS
// ====================
app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            wood: doc
        });
    });
});

app.get('/api/product/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(woods);
    });
});

// ====================
//        BRANDS
// ====================
app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            brand: doc
        });
    });
});

app.get('/api/product/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    });
});

// ====================
//        USERS
// ====================
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // Find the email
    User.findOne({
        'email': req.body.email
    }, (err, user) => {
        if(!user) return res.json({ 
            loginSuccess: false,
            message: 'Email not found.'
        });
        // Check the password
        user.comparePassword(req.body.password, (err, passwordsMatch) => {
            if(!passwordsMatch) {
                return res.json({
                    loginSuccess: false,
                    message: 'Incorrect Password'
                });
            }
            // Generate token
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess: true
                });
            });
        });
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if(err) return res.json({
                success: false,
                err
            });
            return res.status(200).send({
                success: true
            });
        }
    );
});

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        // console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });
});

app.get('/api/users/removeimage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id, (error, result) => {
        if(error) {
            return res.json({ success: false, error });
        }
        res.status(200).send('OK');
    });
});

app.post('/api/users/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;

        doc.cart.forEach((item) => {
            if(item.id == req.query.productId) {
                duplicate = true;
            }
        });

        if(duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.Product) },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, doc) => {
                    if (err) {
                      return res.json({
                        success: false,
                        err
                      });
                    }
                    res.status(200).json(doc.cart);
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { cart: {
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity: 1,
                    date: Date.now()
                }} },
                { new: true },
                (err, doc) => {
                    if(err) {
                        return res.json({ success: false, err});
                    }
                    res.status(200).json(doc.cart);
                }
            )
        }
    });
});

// Fire up the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});