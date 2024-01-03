import {ActionIcon, Avatar, Space, Title, Group, Button, Modal, TextInput, NumberInput, FileInput} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import {IconHome} from '@tabler/icons-react';
import { Link } from "react-router-dom";


const YarnStash = () => {

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

        <Title order={1} c="#474e66" ta="center" >Yarn Stash</Title>

        <Space h="xs" />

        <Modal opened={opened} onClose={close} title="Add yarn" centered>
        {
          <div>
            
            <TextInput label="Brand" placeholder="Yarn brand" />
            
            <TextInput label="Blend" placeholder="Cotton, poliester, wool..." />
            
            <NumberInput
              label="Recommended hook size"
              placeholder="Hook size"
              radius="md"
              decimalScale={2}
              fixedDecimalScale
              step="0.5"
              min={0.5}
              max={15}
            />

            <NumberInput
              radius="md"
              label="Weight"
              description="(grams)"
              placeholder="Weight"
            />

            <NumberInput
              radius="md"
              label="Lenght"
              description="(meters)"
              placeholder="Lenght"
            />

            <FileInput
              radius="md"
              accept="image/png,image/jpeg"
              label="Photo"
              placeholder="Photo of your yarn"
              description="Upload png or jpeg file"
            />

           
          </div>
        }
        </Modal>
        <Group justify="center">
          <Button radius="xl" onClick={open}>Add yarn</Button>
        </Group>
          
      </>
    )
  };
  
  export default YarnStash;