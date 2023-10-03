import React, {useState} from 'react';

import '../styles/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'name') {
            setFullName(value);
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className='mainContainer'>
            <div className="login">
                <h1>Login</h1>
                <form id='loginform' onSubmit={handleFormSubmit}>
                    <input
                        value={email}
                        name='email'
                        onChange={handleInputChange}
                        type='email'
                        placeholder='Email'
                        required    
                    />
                    <input 
                        value={password}
                        name='password'
                        onChange={handleInputChange}
                        type='password'
                        placeholder='Password'
                        required
                    />
                    <button type='submit'>Log In</button>
                    
                </form>
            </div>
            <div className='signup'>
                <h1>Sign Up</h1>
            <form id='signupform' onSubmit={handleFormSubmit}>
                    <input 
                        value= {fullName}
                        name = 'name'
                        onChange={handleInputChange}
                        type='email'
                        placeholder='Full Name'
                        required
                    />
                    <input
                        value={email}
                        name='email'
                        onChange={handleInputChange}
                        type='email'
                        placeholder='Email'
                        required    
                    />
                    <input 
                        value={password}
                        name='password'
                        onChange={handleInputChange}
                        type='password'
                        placeholder='Password'
                        required
                    />
                    <button type='submit'>Sign Up</button>
                    
                </form>
                </div>
            </div>
        </div>
    )
}

// function Login() { 
//     return (
//         <div>
//             <div className="login">
//                 <h1>Login</h1>
//             </div>
//                 <form id='form' onSubmit={handleFormSubmit}>
//                     <input
//                         value={email}
//                         name='email'
//                         onChange={handleInputChange}
//                         type='email'
//                         placeholder='Email'
//                         required    
//                     />
//                     <input 
//                         value={password}
//                         name='password'
//                         onChange={handleInputChange}
//                         type='password'
//                         placeholder='Password'
//                         required
//                     />
//                     <button type='submit'>Log In</button>
                    
//                 </form>
//             <div className='signup'>
//                 <h1>Sign Up</h1>
//             </div>


//         </div>
//     )
// }

export default Login;