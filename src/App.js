import './App.css';
import { useState,useEffect } from 'react';
const { v4: uuidv4 } = require('uuid');



function App() {

  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])
  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [transactions])
  

  async function getTransactions(){
    const url="http://localhost:4040/api/transaction"
    const response = await fetch(url)
    const json = response.json()
    return json
  }

  async function addNewTransaction(ev){
    ev.preventDefault()
    const url="http://localhost:4040/api/transaction"
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        price,
        name,
        description,
        datetime
      })
    }).then(response=>{
      response.json().then(json=>{
        setName('')
        setDatetime('')
        setDescription('')
        setPrice(0)
        console.log('result',json);
      })
    })
  }
  let balance=0
  for(const x of transactions){
    balance = balance+x.price
  }

  return (
    <main className='main'>
      <div className="container">
        <div className="d-flex flex-column mb-3 align-items-center">
          <p className="h1 p-4 mt-2 text-info">Money Tracking App</p>
          <p className="h2 p-2 text-info">${balance}</p>
        </div>
        <form className="row g-3 mb-5" onSubmit={addNewTransaction}>
          <div className="col-md-4">
            <label htmlFor="price" className="form-label text-info">Amount</label>
            <input type="text" className="form-control bg-secondary" id="price" value={price} onChange={ev=>setPrice(ev.target.value)} placeholder="amount"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="product" className="form-label text-info" >Product</label>
            <input type="text" className="form-control bg-secondary" id="product" value={name} onChange={ev=>setName(ev.target.value)} placeholder="product"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="date" className="form-label text-info" >Date</label>
            <input type="date" className="form-control bg-secondary" value={datetime} onChange={ev=>setDatetime(ev.target.value)} id="date"/>
          </div>
          <div className="col-12 ">
            <label htmlFor="description" className="form-label text-info">Description</label>
            <input type="text" className="form-control bg-secondary" value={description} onChange={ev=>setDescription(ev.target.value)} id="description" placeholder="description" />
          </div>
          <div className="col-12 text-center pt-3">
            <button type="submit" className="btn btn-outline-primary w-50">Add New Transaction</button>
          </div>
        </form>
        <div class="container text-center  bg-dark p-2 rounded">
          <div class="row text-info fs-5 ">
            <div class="col">
              Income/Expenditure
            </div>
            <div class="col">
              Description
            </div>
            <div class="col">
              Price
            </div>
          </div>
        </div>
        <div className="container text-center pt-5 ">
          {transactions.length>0 && transactions.map(transaction=>(
            <div key={uuidv4()} className="row text-info  ">
              <div className="col   p-2 border-top border-primary-subtle">
              {transaction.name}<span className='date'>{transaction.datetime}</span>
              </div>
              <div className="col   p-2 border-top border-primary-subtle">
              {transaction.description}
              </div>
              {(transaction.price<0?
                <div className="col  p-2  border-top border-primary-subtle red" >
                  {transaction.price}
                </div>:
                <div className="col  p-2  border-top border-primary-subtle green" >
                  {transaction.price}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
