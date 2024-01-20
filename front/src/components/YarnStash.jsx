import {Group, Button, Modal, TextInput, NumberInput, FileInput, Space, Grid, Image, ActionIcon, Overlay, Title} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from '@mantine/hooks';
import { uploadFile } from "../api/file";
import { useEffect, useState } from "react";
import { addYarnStash, getYarnStash } from "../api/yarnstash";
import { IconEye } from "@tabler/icons-react";

export default function YarnStash() {
  const [opened, { open, close }] = useDisclosure(false);
  const [yarnPhoto, setYarnPhoto] = useState(null);
  const [yarnStash, setYarnStash] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedYarn, setSelectedYarn] = useState(null);
  const [openedYarnInfo, {open: openYarnInfo, close: closeYarnInfo }] = useDisclosure(false);

  const form = useForm()

  useEffect(() => {
    fetchYarnStash();
  }, [])
  const handlePhotoChange = (event) => {
    console.log(event)
    setYarnPhoto(event);
  };

  const fetchYarnStash= async () => {
    try {
      const yarn_stash = await getYarnStash();
      setYarnStash(yarn_stash);
    } catch (error) {
      console.error('Fetch private projects failed', error);
    }
  }

  const handleMouseEnter = index => {
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };


  const handleSubmit = async (values) => {
    var yarn_photo_url = ""
    if (yarnPhoto) {
      try {
        const response = await uploadFile(yarnPhoto);
        console.log('File uploaded successfully', response);
        yarn_photo_url = response.file_url;
      } catch (error) {
        console.error('Upload yarn photo failed', error);
      }
    } else {
      console.log('No file selected');
      return;
    }

    try {
      console.log(values)
      const data = await addYarnStash(values.brand, values.blend, values.hook_size, values.weight, values.length, yarn_photo_url);
      console.log(data);
    } catch (error) {
      console.error('Create project failed', error);
    }
    
  }

  return (
    <>
      <Group justify="flex-end">
        <Button radius="xl" onClick={open}>Add yarn</Button>
      </Group>

      <Grid grow gutter="sm">
          {yarnStash && yarnStash.map((yarn, index) => (
            <Grid.Col span={1} key={index}>

            <div 
              onMouseEnter={() => handleMouseEnter(index)} 
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', width: "250px", height: "250px" }}
              onClick={() => {setSelectedYarn(yarn), openYarnInfo()}}
            >
              <Image radius='lg' w={"250px"} h={"250px"} src={yarn.photo} />
              
              
              {hoveredIndex === index && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                  }}>
                  <ActionIcon size="xl" color="white" variant="transparent">
                    <IconEye size={"200px"}/>
                  </ActionIcon>
                  </div>

                  <Overlay radius="lg" color="#000" opacity={0.7}/>
                </div>
              )}
            </div>
          </Grid.Col>
        ))}
        </Grid>

      <Modal opened={opened} onClose={close} title="Add yarn" centered>
      {
        <div>
          <form onSubmit={form.onSubmit(handleSubmit)}>

          <TextInput 
            value={form.values.brand}
            onChange={(event) => form.setFieldValue('brand', event.currentTarget.value)}
            label="Brand"
            placeholder="Yarn brand"
          />
          
          <TextInput 
            label="Blend" 
            placeholder="Cotton, poliester, wool..." 
            value={form.values.blend}
            onChange={(event) => form.setFieldValue('blend', event.currentTarget.value)}
          />
          
          <NumberInput
            label="Recommended hook size"
            placeholder="Hook size"
            radius="md"
            decimalScale={2}
            fixedDecimalScale
            step="0.5"
            min={0.5}
            max={15}
            value={form.values.hook_size}
            onChange={(value) => form.setFieldValue('hook_size', value)} 
            />

          <NumberInput
            radius="md"
            label="Weight"
            description="(grams)"
            placeholder="Weight"
            value={form.values.weight}
            onChange={(value) => form.setFieldValue('weight', value)} 
          />

          <NumberInput
            radius="md"
            label="Lenght"
            description="(meters)"
            placeholder="Lenght"
            value={form.values.length} 
            onChange={(value) => form.setFieldValue('length', value)} 
          />

          <FileInput
            radius="md"
            accept="image/png,image/jpeg"
            label="Photo"
            placeholder="Photo of your yarn"
            description="Upload png or jpeg file"
            onChange={handlePhotoChange}
          />
          <Space h="sm" />
          <Button type="submit">
            Add yarn
          </Button>
          </form>
          
        </div>
      }
      </Modal>
      <Modal size="lg" radius="lg" opened={openedYarnInfo} onClose={closeYarnInfo}>
        
        {yarnStash && selectedYarn && (
          <>

            <Space h="md" />
            <Group justify="center">
              <Image radius="lg" h="auto" w="450px" fit="contain" src={selectedYarn.photo}/>
            </Group>
            <Title order={3}>Brand: {selectedYarn.brand}</Title>
            <Title order={3}>Blend: {selectedYarn.blend}</Title>
            <Title order={3}>Hook Size: {selectedYarn.hook_size}</Title>
            <Title order={3}>Weight: {selectedYarn.weight}</Title>
            <Title order={3}>Length: {selectedYarn.length}</Title>
  
          </>

        )}
      </Modal>
      
        
    </>
  )
  }
  