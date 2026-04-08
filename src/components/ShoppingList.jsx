import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col.js';
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import "./style.css";

export default function ShoppingList() {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];

    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}products.json`)
            .then((res) => res.json())-100
            .then((data) => setProducts(data.products));
    }, []);

    const navigate = useNavigate();

    return (
    <>
        <Header cart={cart}></Header>
        <div className='container'>
            <Row>
                <h3 className='text-center mt-3 bg-dark text-white p-1' style={{borderRadius:"20px 20px", opacity:"0.9"}}>Genuine & Affordable Goods</h3>
            </Row>
            <Row>
            <h2 className='pt-3' style={{ fontFamily: "Nunito", fontWeight: 500 }}>Grocery Items</h2>
            {products.map((data) => {
                const itemInCart = cart.find(item => item.id === data.id);

                return (
                    <Col key={data.id} md="4" className='mb-4'>
                        <div className="card mb-3 h-100 d-flex flex-column">
                            <div className="row g-0">
                                <div className="col-md-4 text-center align-content-center">
                                    <img src={`${import.meta.env.BASE_URL}${data.imageUrl}`} className="img-fluid rounded-start" alt="" />
                                </div>

                                <div className="col-md-8 d-flex flex-column">
                                    <div className="card-body flex-grow-1">
                                        <h5 className="card-title">{data.name}</h5>
                                        <p className="card-text">{data.description}</p>
                                        <p className="card-text">
                                            Price: ₹ {Number(data.price).toLocaleString('en-IN')} /-
                                        </p>
                                    </div>

                                    <div className='d-flex mb-3 gap-2 px-2'>
                                        <button
                                            className='flex-fill btn btn-warning btn-sm'
                                            onClick={() => {
                                                if (itemInCart) {
                                                    const updatedCart = cart.map(item =>
                                                        item.id === data.id
                                                            ? { ...item, quantity: item.quantity + 1 }
                                                            : item
                                                    );
                                                    setCart(updatedCart);
                                                } else {
                                                    setCart([...cart, { ...data, quantity: 1 }]);
                                                }
                                            }}
                                        >
                                            Add to Cart {itemInCart ? `(${itemInCart.quantity})` : ""}
                                        </button>

                                            <Link to={`/details/${data.id}`} className='text-white text-decoration-none flex-fill btn btn-success btn-sm'>
                                                Details
                                            </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                );
            })}
            </Row>
        </div>
        <Footer />
        </>
    )
}
