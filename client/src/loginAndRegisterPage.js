import RegistrationForm from "./components/Forms/RegsitrationForm.";
import LoginForm from "./components/Forms/LoginForm";

import {
    Card
} from '@mui/material';

const LoginAndRegisterPage = () => {
    return (
        <div className="row justify-content-between">
            <Card variant="outlined" className="col-5">
                <RegistrationForm />
            </Card>
            <Card className="col-5">
                <LoginForm />
            </Card>
        </div>
    );
}

export default LoginAndRegisterPage;