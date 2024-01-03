import {ActionIcon, Avatar, Space, Title,Group, Button, Modal, TextInput, FileInput, Textarea} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import {IconHome} from '@tabler/icons-react';
import { Link } from "react-router-dom";


const ProjectsPlanned = () => {

    const [opened, { open, close }] = useDisclosure(false);

    return (
      <>
        <Space h="xs" />

        <Link to="/profile">
            <Avatar variant="light" src={null} alt="no image here" color="#c6c8ce" />
        </Link>
        
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

        <Space h="xl" />

        <Modal opened={opened} onClose={close} title="Add new project" centered>
        {
          <div>
            
            <TextInput required label="Name" placeholder="Project" />
            <Textarea
              label="Description"
              placeholder="Describe your project"
            />
           

            <FileInput
              variant="filled"
              radius="md"
              label="Pattern file"
              description="Upload png, jpeg or pdf file"
              placeholder="pattern.pdf"
              accept="image/png,image/jpeg,application/pdf"
            />
          </div>
        }
        </Modal>
        <Group justify="center">
            <Button radius="xl" onClick={open}>Add new project</Button>
        </Group>
          
      </>
    )
  };
  
  export default ProjectsPlanned;