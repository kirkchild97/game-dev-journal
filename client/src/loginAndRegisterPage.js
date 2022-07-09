import RegistrationForm from "./components/Forms/RegsitrationForm.";
import LoginForm from "./components/Forms/LoginForm";

const LoginAndRegisterPage = () => {
    return (
        <div className="row justify-content-between">
            <RegistrationForm className='card p-3 col-5' />
            <LoginForm className='card p-3 col-5' />
        </div>
    );
}

export default LoginAndRegisterPage;