import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { Row,Col } from 'react-bootstrap';
import "./style.css";
import Footer from './Footer';
import Header from './Header';

export default function Details() {
    const [items, setItems] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}products.json`)
            .then((res) => res.json())
            .then((data) => setItems(data.products[id - 1]));
    }, [id]);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const itemInCart = cart.find(item => item.id === items?.id);

    return (
        <div>
            <Header cart={cart}></Header>

            <div className='container-fluid d-flex flex-column min-vh-100 px-0'>
                {items && (
                <>
                    <div className='flex-grow-1'>
                        <Row className='mx-0 mt-2'>
                            <Col lg={{ span: 9, offset: 3 }} className='px-0'>
                                <h3 className='bg-secondary text-white p-2'>{items.name}</h3>
                            </Col>
                        </Row>
                        <Row className='mx-0'>
                            <Col xs={12} sm={12} md={4} lg={3} className='pe-lg-5'>
                                <img src={`${import.meta.env.BASE_URL}${items.imageUrl}`} alt="" className='img-fluid productImg' />
                                <div className='d-flex flex-column p-2 gap-2'>
                                    <button
                                        className='flex-fill btn btn-warning mt-2'
                                        onClick={() => {
                                            if (itemInCart) {
                                                const updatedCart = cart.map(item =>
                                                    item.id === items.id
                                                        ? { ...item, quantity: item.quantity + 1 }
                                                        : item
                                                );
                                                setCart(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                            } else {
                                                const updatedCart = [...cart, { ...items, quantity: 1 }];
                                                setCart(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                            }
                                        }}
                                    >
                                        Add to Cart {itemInCart ? `(${itemInCart.quantity})` : ""}
                                    </button>
                                    <button className='btn btn-primary'>
                                        Buy Now
                                    </button>
                                </div>


                            </Col>
                            <Col xs={12} sm={12} md={4} lg={3}>
                                <h5 className='my-4'>Top Highlights:</h5>
                                <table className='highlightsTable'>
                                    <tbody>
                                        <tr>
                                            <th scope='row'>Price</th>
                                            <td>₹ {items.price} /-</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Item Weight</th>
                                            <td>{items.highlights.itemWeight}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Number of Items</th>
                                            <td>{items.highlights.numberOfItems}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Allergen Information</th>
                                            <td>{items.highlights.allergenInformation}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5 className='my-4'>Item Details:</h5>
                                <table className='itemsTable'>
                                    <tbody>
                                        <tr>
                                            <th scope='row'>Brand Name</th>
                                            <td>{items.itemDetails.brandName}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Diet Type</th>
                                            <td>{items.itemDetails.dietType}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Country of Origin</th>
                                            <td>{items.itemDetails.countryOfOrigin}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Manufacturer</th>
                                            <td>{items.itemDetails.manufacturer}</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>Customer Reviews</th>
                                            <td>{items.itemDetails.customerReviews}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={{ span: 5, offset: 1 }}>
                                <h5 className='my-4'>About this Item:</h5>
                                <ul>
                                    {items.about.map((point, index) => (
                                        <li key={index}>
                                            <strong>{point.title}:</strong> {point.text}
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </div>
                    <Footer />
                </>
                )}
            </div>
        </div>
    )
}
