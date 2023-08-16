import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Header from '../Header/Header';
import { useGetTransactionsQuery } from '../../app/api/apiSlice';
import {NavLink} from 'react-router-dom';

const Transactions = () => {
    const { data: transactionsData, isLoading, isError, isSuccess } = useGetTransactionsQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {

        return <p>Error fetching transactions</p>;

    }

    

    return (
        <>
            <Header />
            <Container>
                <h1 className="my-4">Transactions</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Purchase Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsData.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction._id}</td>
                                <td>{transaction.
createdAt}</td>
                                <td><NavLink to={`/view-transaction-details/${transaction._id}`} > View Details </NavLink></td>
                               
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Transactions;
