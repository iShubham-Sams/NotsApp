import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name,setName]=useState('');
  const [list,setList]=useState([]);
  const [isedit,setisEdit]=useState(false);
  const [editId,setEditId]=useState(null);
  const [alert,setAlert]=useState({show:false,msg:'',type:''})

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name){
        showAlert(true,"enter value","danger")
    }else if(name && isedit){
      setList(list.map((item)=>{
        if(item.id===editId){
          return{...item,title:name}
        }
        return item
      }))
      showAlert(true,"eddit to be done","success")
    }else{
      showAlert(true,"item to be added","success")
      const newItem={id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('')
    }
    setEditId(null);
    setName('');
    setisEdit(false);
  }
  const showAlert=(show=false,msg="",type="")=>{
    setAlert({show,msg,type})
  }
  const removeItem=(id)=>{
    showAlert(true,"remove item","danger")
    setList(list.filter((e)=>e.id!==id))
  }
  const editItem=(id)=>{
    const specificItem=list.find((e)=>e.id==id)
    setisEdit(true);
    setEditId(id)
    setName(specificItem.title)
  }
  return <section className='section-center'>
  <form className='Nots-form' onSubmit={handleSubmit}>
    {alert.show && <Alert {...alert} removeAlert={showAlert} List={List}/> }
    <h3>Nots app</h3>
    <div className="form-control">
      <input type="text"  className='Nots' placeholder='Nots' value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <button type='submit'className='submit-btn'>
        {isedit?'edit':'submit'}
      </button>
    </div>
  </form>
  {list.length>0 &&
  <div className='Nots-container'>
  <List items={list} removeItem={removeItem} editItem={editItem}/>
  <button className='clear-btn' onClick={()=>{setList([]); showAlert(true,"list empty","danger")}}>clear items</button>
  </div>}
  </section>
}

export default App
