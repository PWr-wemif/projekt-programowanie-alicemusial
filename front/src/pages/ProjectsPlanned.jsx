import {ActionIcon, Space, Title,Group, Button} from "@mantine/core";
import {IconHome} from '@tabler/icons-react';
import { Link } from "react-router-dom";


const ProjectsPlanned = () => {


    return (
      <>
        <Space h="xs" />

        <Link to="/">
            <ActionIcon variant="light" aria-label="Home page">
                <IconHome style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </Link>

        <Title order={1} c="#474e66" ta="center" >Projects</Title>

        <Space h="xs" />

        <Group justify="center" gap="md">
          
            <Button variant="filled" >Planned</Button>

            <Link to="/profile/projects/active">
                <Button variant="light">Active</Button>
            </Link>

            <Link to="/profile/projects/completed">
                <Button variant="light">Completed</Button>
            </Link>
        </Group>
          
      </>
    )
  };
  
  export default ProjectsPlanned;