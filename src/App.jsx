import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import _ from 'lodash';

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [pagination, setPagination] = useState(1);
 
   const getData = async() =>{ 
    const data = await axios.get('https://fakestoreapi.com/products?limit=15')
    const responseData = data.data
    setFetchData(responseData);
  }

  useEffect(()=>{
    getData()
  },[])

  const handlePagination = (index) => {
    setPagination(index);
  }

  const handleNext = () => {
    setPagination(pagination+1)
  }

  const handlePrev = () => {
    setPagination(pagination-1)
  }

  return (
    <>
      <table cellPadding="2px" cellSpacing="2px" border="5px">
        <thead>
          <th>Sr no.</th>
          <th>Title</th>
          <th>Image</th>
          <th>Price</th>
          <th>Category</th>
        </thead>
        <tbody>
          {_.map(_.slice(fetchData,pagination*5 - 5,pagination*5),(tableData)=>(
          <tr>
            <td>{tableData.id}</td>
            <td>{tableData.title}</td>
            <td><img src={tableData.image} alt="product" width="150px" height="150px" /></td>
            <td>{tableData.price}</td>
            <td>{tableData.category}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:'inline-flex', placeItems:'center', gap:'2px'}}>
      <button onClick={handlePrev} disabled={pagination===1}>◀️</button>
      <div>{_.map([...Array(fetchData.length/5)],(_,i)=>{
          return <button onClick={()=>handlePagination(i+1)}>{i+1}</button>
      })}</div>
      <button onClick={handleNext} disabled={pagination===fetchData.length/5}>▶️</button>
      </div>
    </>
  )
}

export default App
