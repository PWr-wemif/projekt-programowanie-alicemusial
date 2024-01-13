import { useForm } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Stack,
    Container,
    Image,
  } from '@mantine/core';
import { login, register } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
  const navigate = useNavigate();

    const form = useForm({
      initialValues: {
        email: '',
        username: '',
        password: '',
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });

    const handleSubmit = async (values) => {
      try {
        const data = await register(values.email, values.username, values.password);
        console.log(data);
        if (data.id) {
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
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    }


    return (
        <Container size={420} my={40}>
          <Link to="/">
            <Group justify='center'>
             <Image h={150} w={150} src="./public/logo.png"/>
            </Group>
          </Link>
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>


        <TextInput
            required
            label="Email"
            placeholder="email@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
        />

        <TextInput 
          required
          label="Username"
          placeholder="Your username"
          value={form.values.username}
          onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
          radius="md"
        />

        <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
        />

        
        </Stack>

        <Group justify="flex-end" mt="xl">

        <Button type="submit" radius="xl">
            Register
        </Button>
        </Group>
    </form>
    </Container>)
};

export default Register;