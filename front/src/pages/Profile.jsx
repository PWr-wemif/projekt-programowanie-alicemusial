import {Title, Button, Space,Avatar} from "@mantine/core";

const Profile = () => {


  return (
    <>
        <Space h="lg" />

        <Avatar variant="light" src={null} alt="no image here" color="#c6c8ce" justify="right"/>

        <Title order={1} c="#474e66" ta="center" >Account & tools</Title>

        <Space h="lg" />

        <Title order={3} c="#555a72">Your profile</Title>

        <Button.Group orientation="vertical" gap='sm'>
            <Button fullWidth justify="center" c="BlueGray" variant="default" size="xl">Change profile picture</Button>
        </Button.Group>

        <Space h="lg" />

        <Title order={3} c="#555a72">Tools</Title>

        <Space h="lg" />

        <Button.Group orientation="vertical" gap='sm'>
            <Button fullWidth justify="center" c="BlueGray" variant="default" size="xl">Projects</Button>
            <Button fullWidth justify="center" c="BlueGray" variant="default" size="xl">Yarn stash</Button>
            <Button fullWidth justify="center" c="BlueGray" variant="default" size="xl">Hook stash</Button>
        </Button.Group>
        
    </>
  )
};

export default Profile;