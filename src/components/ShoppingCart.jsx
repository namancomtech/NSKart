import React from 'react'
import { useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router";
import { useState, useEffect } from 'react';
import Footer from './Footer';

export default function ShoppingCart() {
    const location = useLocation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    const totalPrice = items.reduce((sum, item) => {
        return sum + item.price * (item.quantity || 1);
    }, 0);

    const deleteProduct = (id) => {
        // const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cart = items;
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setItems(updatedCart);
    };

    const increaseQty = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
        });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setItems(updatedCart);
    };

    const decreaseQty = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: (item.quantity || 1) - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0); // remove if 0

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setItems(updatedCart);
    };

    //Remove all items
    const handleCheckout = () => {
        localStorage.removeItem("cart"); // or clear()
        setItems([]); // update UI
    };

    return (
        <>
        <div className='w-75 m-auto'>
            <div className='container mt-3'>
                <Row>
                    <div className='d-flex align-items-center'>
                        <Link to="/" className='text-dark'><i className="bi bi-caret-left-fill fs-3"></i></Link>
                        <h3 className='p-2'>Shopping Continue</h3>
                    </div>
                    <hr className='border border-dark border-2' />
                </Row>
            </div>
            <div className='container'>
                <Row>
                    <Col className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h4 className='mt-2'>Shopping Cart</h4>
                            <h6>You have {items ? items.length : 0} items in your cart</h6>
                        </div>
                        <a className='btn btn-danger' onClick={handleCheckout}>Clear All</a>
                    </Col>

                    {items.map((item, index) => (
                        <div className='border border-light border-3 p-3 d-flex align-items-center justify-content-between mb-4' style={{ borderRadius: "10px 10px" }} key={index}>
                            <Col md={2}>
                                <img src={item.imageUrl} style={{ width: "75px" }} alt="" />
                            </Col>
                            <Col md={5}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                            </Col>
                            <Col className="d-flex align-items-center gap-2" md={2}>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => decreaseQty(item.id)}
                                >-</button>

                                <span>{item.quantity}</span>

                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => increaseQty(item.id)}
                                >+</button>
                            </Col>
                            <Col md={2}>
                                <h5>₹ {item.price * (item.quantity || 1)}</h5>
                            </Col>
                            <Col md={1}>
                                <a className='btn btn-danger btn-sm' onClick={() => deleteProduct(item.id)}><i className="bi bi-trash trash fs-5" ></i></a>
                            </Col>
                        </div>
                    ))}
                    <div className='d-flex justify-content-end mb-3'>
                        <div className='col-sm-6 d-flex align-items-center justify-content-between p-2 px-3 ms-3 bg-success text-white' style={{ borderRadius: "10px 10px" }}>
                            <h4>Total Price: </h4>
                            <h4>₹ {totalPrice} /-</h4>
                        </div>
                    </div>

                </Row>
            </div>
        </div>
        <Footer/>
        </>
    );

}

