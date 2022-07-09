import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { emailRegex } from '../../constants/validations';

import { tryRegisterUser } from '../../state/actions/userActions';

const RegistrationForm = ({className}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        firstName : '',
        lastName : '',
        userName : '',
        email : '',
        password : '',
        confirm : ''
    });

    const errorMessages = {
        firstMin : 'First name must have at least 3 characters',
        lastMin : 'Last name must have at least 3 characters',
        emailFormat : 'Must use valid email address',
        userMin : 'Username must be at least 3 characters long',
        passwordMin : 'Password must be at least 8 characters long',
        confirm : 'Passwords must match'
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const setInput = {};
        setInput[name] = value;
        setInputs({ ...inputs, ...setInput });
    }
    const validateInputs = (name) => { //MAYBE ADD VALIDATIONS TO KEEP USER FROM HAVING EMAIL FORMAT FOR USERNAME
        let isValid = true;
        switch(name){
            case 'firstName':
                isValid = inputs.firstName.length >= 3;
                return isValid;
            case 'lastName' :
                isValid = inputs.lastName.length >= 3;
                return isValid
            case 'userName' :
                isValid = inputs.userName.length >= 3;
                return isValid;
            case 'email' :
                isValid = emailRegex.test(inputs.email);
                return isValid;
            case 'password' :
                isValid = inputs.password.length >= 8;
                return isValid;
            case 'confirm' :
                isValid = inputs.confirm === inputs.password && inputs.confirm !== '';
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
        console.log('Sending Registration Now');
        await dispatch(tryRegisterUser(inputs));
        setInputs({
            firstName : '',
            lastName : '',
            userName : '',
            email : '',
            password : '',
            confirm : ''
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <h2>Register</h2>
            <>
                <p className={validateInputs('firstName') ? 'text-success' : 'text-danger'}>{ errorMessages.firstMin }</p>
                <p className={validateInputs('lastName') ? 'text-success' : 'text-danger'}>{ errorMessages.lastMin }</p>
                <p className={validateInputs('email') ? 'text-success' : 'text-danger'}>{ errorMessages.emailFormat }</p>
                <p className={validateInputs('userName') ? 'text-success' : 'text-danger'}>{ errorMessages.userMin }</p>
                <p className={validateInputs('password') ? 'text-success' : 'text-danger'}>{ errorMessages.passwordMin }</p>
                <p className={validateInputs('confirm') ? 'text-success' : 'text-danger'}>{ errorMessages.confirm }</p>
            </>
            <div className=''>
                <label htmlFor="firstName">First Name:</label>
                <input className='form-control' type="text" name="firstName" id="firstName"
                onChange={(e) => {handleChange(e)}} value={inputs.firstName}/>
            </div>
            <div className=''>
                <label htmlFor="lastName">Last Name:</label>
                <input className='form-control' type="text" name="lastName" id="lastName"
                onChange={(e) => {handleChange(e)}} value={inputs.lastName}/>
            </div>
            <div className=''>
                <label htmlFor="userName">Username:</label>
                <input className='form-control' type="text" name="userName" id="userName"
                onChange={(e) => {handleChange(e)}} value={inputs.userName}/>
            </div>
            <div className=''>
                <label htmlFor="email">Email:</label>
                <input className='form-control' type="text" name="email" id="email"
                onChange={(e) => {handleChange(e)}} value={inputs.email}/>
            </div>
            <div className=''>
                <label htmlFor="password">Password:</label>
                <input className='form-control' type="text" name="password" id="password"
                onChange={(e) => {handleChange(e)}} value={inputs.password}/>
            </div>
            <div className=''>
                <label htmlFor="confirm">Confirm Password:</label>
                <input className='form-control' type="text" name="confirm" id="confirm"
                onChange={(e) => {handleChange(e)}} value={inputs.confirm}/>
            </div>
            <input className='btn col-6 border border-2' type="submit" value="Register" />
        </form>
    );
}

export default RegistrationForm;