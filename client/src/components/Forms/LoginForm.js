import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { emailRegex } from '../../constants/validations';

import { tryLoginUser } from '../../state/actions/userActions';


const LoginForm = ({className}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        userNameEmail : '',
        password : ''
    });

    const errorMessages = {
        userMin : 'Username must be at least 3 characters long',
        passwordMin : 'Password must be at least 8 characters long',
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setInput = {};
        setInput[name] = value;
        setInputs({ ...inputs, ...setInput });
    }
    const validateInputs = (name) => {
        let isValid = true;
        switch(name){
            case 'userNameEmail' :
                isValid = inputs.userNameEmail.length >= 3;
                return isValid;
            case 'password' :
                isValid = inputs.password.length >= 8;
                return isValid;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Hiitting Submit');
        const inValidInputs = Object.keys(inputs).filter(i => !validateInputs(i));
        // console.log(inValidInputs);
        if(inValidInputs.length !== 0){
            console.log('Unable to send registration request.');
            return;
        }
        console.log('Sending Login Request Now');
        await dispatch(tryLoginUser(inputs));
        setInputs({
            userNameEmail : '',
            password : ''
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <h2>Login</h2>
            <>
                <p className={validateInputs('userNameEmail') ? 'text-success' : 'text-danger'}>{ errorMessages.userMin }</p>
                <p className={validateInputs('password') ? 'text-success' : 'text-danger'}>{ errorMessages.passwordMin }</p>
            </>
            <div className=''>
                <label htmlFor="userNameEmail">Username or Email:</label>
                <input className='form-control' type="text" name="userNameEmail" id="userNameEmail"
                onChange={(e) => {handleChange(e)}} value={inputs.userNameEmail}/>
            </div>
            <div className=''>
                <label htmlFor="password">Password:</label>
                <input className='form-control' type="text" name="password" id="password"
                onChange={(e) => {handleChange(e)}} value={inputs.password}/>
            </div>
            <input className='btn col-6 border border-2' type="submit" value="Register" />
        </form>
    );
}

export default LoginForm;