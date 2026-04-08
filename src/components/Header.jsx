import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Header({ cart }) {
    return (
        <div className='container-fluid bg-warning py-2 p-sm-0'>
            <div className='container p-0'>
                <Row>
                    <Col className='d-flex align-items-center ms-2'>
                        <i className="bi bi-cart-check fs-3 me-1"></i>
                        <Link to="/" className='text-decoration-none text-dark'>
                            N<sub>S</sub>Kart
                        </Link>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center me-3 my-3'>
                        <Link to="/mycart">
                            <button type="button" className="btn btn-dark position-relative fs-5">
                                My Cart
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                                    {cart?.length || 0}
                                </span>
                            </button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
