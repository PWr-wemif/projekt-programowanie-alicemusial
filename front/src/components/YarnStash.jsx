import {Space, Group, Button, Modal, TextInput, NumberInput, FileInput} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

export default function YarnStash() {

  const [opened, { open, close }] = useDisclosure(false);

    return (
      <>
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
  }
  