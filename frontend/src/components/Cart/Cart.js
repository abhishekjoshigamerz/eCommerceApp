import React from 'react';
import Header from '../Header/Header';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from '../../app/cart';

import {useCreateTransactionMutation} from '../../app/api/apiSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const [createTransaction, { isLoading, isError }] = useCreateTransactionMutation();
    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart({ id }));
    }


    const makeTransaction = async() => {
        try {
         const result = await createTransaction(cart);
         console.log(result);    
         dispatch(clearCart());
        } catch (error) {
            console.log(error);

        }
        
        
    }
   

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseItemQuantity({ id }));
    }

    const handleDecreaseQuantity = (id) => {
         const itemToUpdate = cart.find(item => item._id === id);

    // Check if the item exists and its quantity is greater than 0
    if (itemToUpdate && itemToUpdate.quantity > 0) {
        // Dispatch the decreaseItemQuantity action
        dispatch(decreaseItemQuantity({ id }));
        
        // Check if the updated item's quantity becomes 0
        if (itemToUpdate.quantity - 1 === 0) {
            // Dispatch the removeItemFromCart action
            dispatch(removeItemFromCart({ id }));
        }
    }

    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <Container>
                <h1 className="my-4">Shopping Cart</h1>
                <Row>
                    <Col key="col-cart" xs={9} md={9} lg={9}>
                        {cart.length === 0 ? (
                            <p>There are no items in your cart.</p>
                        ) : (
                            cart.map(item => (
                                <Card className="mb-4" key={item._id}>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>Price: ${item.price}</Card.Text>

                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveItem(item._id)}
                                        >
                                            Remove
                                        </Button>

                                        <div>
                                            <button onClick={() => handleDecreaseQuantity(item._id)} className='mt-4'>-</button>
                                            <span>&nbsp;&nbsp;{item.quantity}&nbsp;&nbsp;</span>
                                            <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                        <div className="text-center mt-4">
                            <Button variant="primary" className='mt-4' size="lg" disabled={cart.length === 0} onClick={makeTransaction}>
                                Make Payment (${total})
                            </Button>
                            <Button variant="danger" className='mt-4' size="lg" onClick={() => dispatch(clearCart())} disabled={cart.length === 0}>
                                Clear cart
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart;
