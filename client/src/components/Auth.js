import {useState} from "react";
import {useCookies} from "react-cookie";
function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    
    console.log(cookies);
    const viewLogin = (status)=> {
      setError(null);
      setIsLogin(status);
    }
    const handleSubmit = async (e, endpoint) => {
      e.preventDefault();
      if(!isLogIn && password !== confirmPassword) {
        setError('Make sure password match!');
        return;
      }
      const response = await fetch(`http://localhost:8000/${endpoint}`,{
        method : 'POST',
        headers:{'Content-Type':'application/json'},
        body : JSON.stringify({email, password})
      })

      const data = await response.json();

      if(data.detail){
        setError(data.detail);
        console.log("error", error  );
      }else{
        setCookie('Email', data.email);
        setCookie('AuthToken', data.token);
        
        window.location.reload(); // 현재 URL(window.location)을 새로 고침 하는 기능 , 이게 없으면 에러가 난다.. 왜일까??
      }
    }
    const onEmailChange = (e)=> {
      setEmail(e.target.value);
    }
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn? 'Please log in':'Please sign up!'}</h2>
            <input type="email" placeholder="email" onChange={onEmailChange}/>
            <input type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
            {!isLogIn && <input type="password" placeholder="confirm password" onChange={(e)=>setConfirmPassword(e.target.value)}/> }
            <input className="create" type="submit" onClick={(e)=> handleSubmit(e, isLogIn ? 'login':'signup')} />
            {error&&<p>{error}</p>}
          </form> 
          <div className="auth-options">
            <button 
              onClick={()=> viewLogin(false)}
              style={{backgroundColor : !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            >Sign Up</button>
            <button 
              onClick={()=> viewLogin(true)}
              style={{backgroundColor : isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            >Login</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;
  