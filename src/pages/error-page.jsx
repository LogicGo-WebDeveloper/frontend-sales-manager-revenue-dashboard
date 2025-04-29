import { Result } from 'antd'
import React from 'react'
import PrimaryButton from '../components/common/primary.button'
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ status, title, subTitle, buttonText}) => {

    const navigate = useNavigate();
    const handleBackHome = () => {
      navigate('/');
    }
  
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={<PrimaryButton onClick={handleBackHome} type="primary" style={{width: "130px", height: "40px"}} >{buttonText}</PrimaryButton>}
        />
    )
}

export default ErrorPage
