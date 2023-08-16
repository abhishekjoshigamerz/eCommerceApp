const Transaction = require('../../model/transaction');
module.exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

module.exports.getTransactionById = async (req, res) => {   

    const Id = req.params.id;

    try{
        const transaction = await Transaction.findById(Id);
        res.status(200).json(transaction);

    }catch(error){
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'An error occurred' });
    }

}


//create a transaction

module.exports.createTransaction = async (req, res) => {

    try {

        console.log(req.body[0]);
        const data = req.body;
        const newTransaction = new Transaction({items:data});
        await newTransaction.save();
        console.log('Transaction saved:', newTransaction);
        res.status(201).json({ message: 'Transaction created successfully' });

    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'An error occurred' });
    }


}