const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        User: req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    });
});

// get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("User","name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});

// get logged in user orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ User: req.user._id });

    res.status(200).json({
        success:true,
        orders,
    });
});

// get all orders -- admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount=0;

    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});

// Update Order Status -- admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }

    order.orderItems.forEach(async (o)=>{
        await updateStock(o.product,o.quantity);
    });

    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
    });
});

async function updateStock(id, quantity) {


    const product = await Product.findById(id);


    product.Stock -= quantity;


    await product.save({ validateBeforeSave: false });
}

// Delete Orders

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success:true,
        
    });
});