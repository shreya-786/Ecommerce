const { addListener } = require("nodemon");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
//Create Product

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});

// Get All Product
// exports.getAllProducts = catchAsyncErrors(async(req,res)=>{

//     const resultPerPage = 5;
//     const productCount = await Product.countDocuments();

//     const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
//     const products = await apiFeature.query;
//     res.status(200).json({
//         success:true,
//         products
//     })

// })
// 
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments();

        

        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter();

            console.log(apiFeature.query);

        let products = await apiFeature.query;

        console.log(products);

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);

        products = await apiFeature.query.clone(); // Clone the query to prevent reusing the same cursor

        res.status(200).json({
            success: true,
            productCount,
            products,
            resultPerPage,
            filteredProductsCount,
        });

    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});

// Get Product Details
exports.getProductDetails = async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product,
    }) 
}

// Update Product

exports.updateProduct = async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

// Delete Product

exports.deleteProduct = async(req,res,next)=>{

    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
       return res.status(500).json({
        success:false,
        message:"Product not found"
       }) 
    }

    // await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Delected Successfully"
    })
}

// Create New Reviw or Update the review

// exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

//     const {rating,comment,productId} = req.body
//     const review = {
//         user:req.user._id,
//         name:req.user.name,
//         rating: Number(rating),
//         comment,

//     };

//     const product = await Product.findById(productId);

//     const isReviewed = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString())

//     if(isReviewed){
//         product.reviews.forEach(rev => {
//             if(rev.user.toString()===req.user._id.toString())
//             rev.rating=rating,
//             rev.comment=comment
//         })

//     }
//     else{
//        product.reviews.push(review);
//        product.numOfReviews = product.reviews.length
//     }
//     let avg=0;

//     product.ratings = product.reviews.forEach(rev=>{
//         avg+=rev.rating
//     })/product.reviews.length;

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success:true,
//     });
// });
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get AllReviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter( rev=> rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
);

    res.status(200).json({
        success: true,
    });
});