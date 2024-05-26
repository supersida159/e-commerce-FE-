import Container from '@/app/components/nav/Container';
import FormWrap from '@/app/components/products/FormWrap';
import ChangePasswordForm from './changPasswordForm';

const ChangePassword = () => {
  return (
    <Container>
      <FormWrap>
        <ChangePasswordForm />
      </FormWrap>
    </Container>
  );
};

export default ChangePassword;
