import  React , {useState} from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import axios from './axios.js';
import './App.css';
import { renderIntoDocument } from 'react-dom/test-utils';


const App = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [lang, setLang] = useState("EN");
  const [step, setStep] = useState("");
  const [countries,setCountries] = useState([]);
  
  //////////////////
  async function fetchData(){
    const req = await axios.get('/api/countries');

    setCountries(req.data);
}
 
  const translation = [
        {id : 1, name : "EN"},
        {id : 2, name : "RUS"}
    ]; 

    const dectionary = {
      EN : {
          firstname: 'First Name',
          lastname: 'Last Name',
          title: 'Title',
          country: 'Country',
          city: 'City',
          street: 'Street',
          email: 'Email',
          phone: 'Phone',
          back: 'Back',
          next: 'Next',
          submit: 'Submit',
          terms: 'I accept the terms of service '
      },
      RUS : {
        firstname: 'Имя',
        lastname: 'Фамилия',
        title: 'заглавие',
        country: 'страна',
        city: 'город',
        street: 'улица',
        email: 'Эл. адрес',
        phone: 'Телефон',
        back: 'назад',
        next: 'следующий',
        submit: 'Разместить',
        terms:'Я принимаю условия предоставления услуг'
      }
    }
    
  
  
  const submit = (e) => {
    e.preventDefault();
   }
   const validStep1 = () =>{
      if(firstName === '' || lastName === ''){
        alert('First Name and Last Name are required');
        setStep('');
        
      }else{
        setStep('step2')
        fetchData();
      }
   }
   const validStep2 = () =>{
    if(country === ''){
      alert('Country field is required');
      setStep('step2');  
    }else{
      setStep('step3')
    }
 }

 const submitValidation = () =>{
   if(email === ''){
      alert('Email field is required');
      return;
   }else{
     if(/^[-a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) && /^0[1-9]{1}[0-9]{8}$/.test(phone)){
          alert('Valid Format');
     }else{
       alert('Bad format');
       return;
     }
     
   } 
   
   let result = JSON.stringify({
    firstName:firstName,
    lastName:lastName,
    title:title,
    country:country,
    city:city,
    street:street,
    email:email,
    phone:phone
   });

   axios.post('http://localhost:8001/api/customer',  result ,{

    "headers": {
    
    "content-type": "application/json",
    
    },
    
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

     alert(`successfully added new customer ${result} `) 
   
 }
  

    return (
      
      <div className="App">
        <select value={lang} onChange={e => setLang(e.target.value)}>
				{translation.map((country) => (
                    <option 
                        value={country.name} 
                        key={country.id}
                        onChange={e => setLang(e.target.value)}  
                    >
                        {country.name}
                    </option> 
                ))};
            </select>
        <BrowserRouter>
        
        <Switch>
        <Route exact path='/' render={()=>(
            <form className ="form" onSubmit={submit}>
            <div className="progress">
            <span className="step1" style={{background: "green"}}>1</span>
						<span className="step2">2</span>
						<span className="step3">3</span>
            </div>
        <br></br>
            <label>
            {dectionary[lang].firstname}:
            <input
              name="firstName"
              type="text"
              value={firstName}
               onChange={e => setFirstName(e.target.value)}
              required />
            </label>
            <label>
            {dectionary[lang].lastname}:
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required />
            </label>
            <label>
            {dectionary[lang].title}:
            <input
              name="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
            </label>
            <Link  onClick={validStep1} to={`/${step}`}>
            <center><button className="btn">{dectionary[lang].next}</button></center>
            </Link>
            
            </form>
        )}/>

<Route exact path='/step2'
        render={()=>(
          <form className="form">
            <div className="progress">
            <span className="step1" >1</span>
						<span className="step2" style={{background: "green"}}>2</span>
						<span className="step3">3</span>
            </div>
<label>
{dectionary[lang].country}:
        <select
          name="country"
          value={country}
		  onChange={e => setCountry(e.target.value)}
          required>
          <option key=""></option>
          {countries.map(country => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </label>
<label>
{dectionary[lang].city}:
<input
  name="city"
  type="text"
  value={city}
  onChange={e => setCity(e.target.value)}
  />
</label>
<label>
{dectionary[lang].street}:
<input
  name="street"
  type="text"
  value={street}
  onChange={e => setStreet(e.target.value)}
/>
</label>
<div className='btns'>
  <Link to="/"><button >{dectionary[lang].back}</button></Link>
  <Link to={`/${step}`} onClick={validStep2}><button >{dectionary[lang].next}</button></Link>
</div>
</form>
        )}/>
        <Route exact path='/step3'
        render={()=>(
          <form className="form">
            <div className="progress">
            <span className="step1" >1</span>
						<span className="step2" >2</span>
						<span className="step3"style={{background: "green"}}>3</span>
            </div>
<label>
{dectionary[lang].email}:
<input
  name="email"
  type="email"
  value={email}
  onChange={e => {setEmail(e.target.value)}}
  required />
</label>
<label>
{dectionary[lang].phone}:
<input
  name="phone"
  type="text"
  value={phone}
  onChange={e => setPhone(e.target.value)} />
</label>
<label>
        <input
          name="acceptedTerms"
          type="checkbox"
          onChange={e => setAcceptedTerms(e.target.value)} />
        {dectionary[lang].terms}        
      </label>
	  <div className='btns'>
  <Link to="/step2"><button>{dectionary[lang].back}</button></Link>
	<button onClick={submitValidation}>{dectionary[lang].submit}</button>
</div>
</form>
        )}/>
        
        </Switch>
        </BrowserRouter>
      </div>
    ); 
  
  
}


export default App;
