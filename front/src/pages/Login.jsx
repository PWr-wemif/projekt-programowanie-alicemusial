import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Group, Button, Stack, Container, Image } from '@mantine/core';
import { login } from '../api/auth';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
      try {
          const data = await login(values.email, values.password);
          console.log(data);
  
          if (data.access_token) {
              Cookies.set('token', data.access_token, { expires: 7 }); 
              navigate('/');
          } else {
              throw new Error('Login failed - No access token');
          }
      } catch (error) {
          console.error('Login failed', error);
      }
    };


    return (
        <Container size={420} my={40}>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Link to="/">
                    <Group justify='center'>
                    <Image h={150} w={150} src="./public/logo.png"/>
                    </Group>
                </Link>
                <Stack>
 
                    <TextInput
                        required
                        label="Email"
                        placeholder="email@example.com"
                        {...form.getInputProps('email')}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                        radius="md"
                    />
                </Stack>

                <Group justify="flex-end" mt="xl">
                    <Button type="submit" radius="xl">Login</Button>
                </Group>
            </form>
        </Container>
    );
};

export default Login;