import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { emailRegex } from '../../constants/validations';

import { tryRegisterUser } from '../../state/actions/userActions';

import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    CardHeader,
    CardContent
} from '@mui/material';

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
            <CardHeader title={<h2>Register</h2>} />
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="firstName">First Name:</InputLabel>
                <Input  type="text" name="firstName" id="firstName"
                onChange={(e) => {handleChange(e)}} value={inputs.firstName}/>
                <FormHelperText error={!validateInputs('firstName')} >{errorMessages.firstMin}</FormHelperText>
            </FormControl>
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="lastName">Last Name:</InputLabel>
                <Input type="text" name="lastName" id="lastName"
                onChange={(e) => {handleChange(e)}} value={inputs.lastName}/>
                <FormHelperText error={!validateInputs('lastName')} >{errorMessages.lastMin}</FormHelperText>
            </FormControl>
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="userName">Username:</InputLabel>
                <Input type="text" name="userName" id="userName"
                onChange={(e) => {handleChange(e)}} value={inputs.userName}/>
                <FormHelperText error={!validateInputs('userName')} >{errorMessages.userMin}</FormHelperText>
            </FormControl>
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <Input type="text" name="email" id="email"
                onChange={(e) => {handleChange(e)}} value={inputs.email}/>
                <FormHelperText error={!validateInputs('email')} >{errorMessages.emailFormat}</FormHelperText>
            </FormControl>
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input type="text" name="password" id="password"
                onChange={(e) => {handleChange(e)}} value={inputs.password}/>
                <FormHelperText error={!validateInputs('password')} >{errorMessages.passwordMin}</FormHelperText>
            </FormControl>
            <FormControl className='my-2 form-control'>
                <InputLabel htmlFor="confirm">Confirm Password:</InputLabel>
                <Input type="text" name="confirm" id="confirm"
                onChange={(e) => {handleChange(e)}} value={inputs.confirm}/>
                <FormHelperText error={!validateInputs('confirm')} >{errorMessages.confirm}</FormHelperText>
            </FormControl>
            <Button size='large' disabled={Object.keys(inputs).filter(i => !validateInputs(i)).length} className='btn col-6 border border-2' type="submit" >Register</Button>
        </form>
    );
}

export default RegistrationForm;