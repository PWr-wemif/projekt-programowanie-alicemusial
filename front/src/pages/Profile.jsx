import {Title, Button, Space,Avatar, Container, Stack, Group, Divider} from "@mantine/core";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Projects from "../components/Projects";
import { userInfo } from "../api/user";
import YarnStash from "../components/YarnStash";

const Profile = () => {
    const [selectedStatus, setSelectedStatus] = useState('Projects');
    const [user, setUser] = useState(null);

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userInfo();
                setUser(userData);
            } catch (err) {
                console.error(err);
            
            }
        };
        fetchUserData();
    }, [])

    return (<>
        <Header />

        <Container>
            <Space h="lg" />


            {user && <Stack align="center">
                
                <Avatar size={'200px'} src={null} alt="no image here" color="#c6c8ce" />
                
                <Title order={2} c="#555a72">{user.username}</Title>
            </Stack>}
           
            <Space h="lg" />

            <Group justify="center">
                <Button 
                    variant={selectedStatus === 'Projects' ? 'filled' : 'subtle'}
                    radius='lg'
                    size='md'
                    onClick={() => handleSelectStatus('Projects')}>
                    Projects
                </Button>
                <Button 
                    variant={selectedStatus === 'Yarn Stash' ? 'filled' : 'subtle'}
                    size='md'
                    radius='lg'
                    onClick={() => handleSelectStatus('Yarn Stash')}>
                    Yarn Stash
                </Button>

            </Group>
            <Divider my="md" />

            {selectedStatus === 'Projects' && <Projects />}
            {selectedStatus === 'Yarn Stash' && <YarnStash />}
        </Container>
        </>
    );
};


export default Profile;