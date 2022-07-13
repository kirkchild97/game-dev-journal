import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

import { emailRegex } from '../../constants/validations';

import { tryLoginUser } from '../../state/actions/userActions';

import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    CardHeader,
    CardContent
} from '@mui/material';

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
        const result = await dispatch(tryLoginUser(inputs));
        if(tryLoginUser.fulfilled.match(result) && result.payload.success){
            setInputs({
                userNameEmail : '',
                password : ''
            });
        }
        else{
            alert('Invalid Login Credentials');
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <CardHeader title={<h2>Login</h2>} />
            <CardContent>
                <FormControl className='my-2'>
                    <InputLabel htmlFor="userNameEmail">Username or Email:</InputLabel>
                    <Input type="text" name="userNameEmail" id="userNameEmail"
                    onChange={(e) => {handleChange(e)}} value={inputs.userNameEmail}/>
                    <FormHelperText error={!validateInputs('userNameEmail')}>Username must be at least 3 characters long</FormHelperText>
                </FormControl>
                <FormControl className='my-2'>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <Input type="text" name="password" id="password"
                    onChange={(e) => {handleChange(e)}} value={inputs.password}/>
                    <FormHelperText error={!validateInputs('password')}>Passowrd must be at least 8 characters long</FormHelperText>
                </FormControl>
                <Button size="large" variant='outlined' disabled={!validateInputs('password') || !validateInputs('userNameEmail')} type="submit" value="Register" >Login</ Button>
            </CardContent>
        </form>
    );
}

export default LoginForm;