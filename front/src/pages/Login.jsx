import { useForm } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Stack,
    Container,
  } from '@mantine/core';

const Login = () => {
    const form = useForm({
      initialValues: {
        username: '',
        password: '',
        terms: true,
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });
    return (
        <Container size={420} my={40}>
        <form onSubmit={form.onSubmit(() => {})}>
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
            Login
        </Button>
        </Group>
    </form>
    </Container>)
};

export default Login;