import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { useGetTransactionByIdQuery } from '../../app/api/apiSlice';
import './TransactionDetail.css';

const Transactions = () => {
    const { id } = useParams();
    let rowNumber = 1;
    const { data: transactionsData, isLoading, isError, isSuccess } = useGetTransactionByIdQuery(id);

    if (isLoading) {

        return <p>Loading...</p>;
    }

    if (isError) {

        return <p>Error fetching transactions</p>;
    }
    let total = 0;
    return (
        <>
            <Header />
            <Container>
                <h1 className="my-4">Transaction Detail  </h1>
                <p>Transaction Id : {id} </p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Purchase Date</th>
                            <th>Item Image</th>
                            <th>Item Price</th>
                            <th>Item Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsData.items.map((item, index) => (
                            total += item.price * item.quantity,
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.purchaseDate}</td>
                                <td>
                                    <img src={item.image} alt={item.name} className='fixedSizeImage' />
                                </td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}


                    </tbody>

                      <div className="text-center">
                            <h4>Total: ${total}</h4>
                       </div>
                </Table>
            </Container>
        </>
    )
}

export default Transactions;
