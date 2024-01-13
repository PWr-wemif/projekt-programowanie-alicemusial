import {Group, Button, Modal,  TextInput, FileInput, Textarea, Switch, Space } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { uploadFile } from "../api/file";
import { createProject } from "../api/project";
import { useForm } from "@mantine/form";



export default function Projects() {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedStatus, setSelectedStatus] = useState('active');

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
    }

    const [projectImage, setProjectImage] = useState(null);
    const [patternFile, setPatternFile] = useState(null);


    const handleFileChange = (event) => {
      console.log(event)
      setProjectImage(event);
    };
  
    const handlePatternChange = (event) => {
      console.log(event)
      setPatternFile(event);
    }


    const form = useForm({
      initialValues: {
        title: '',
        description: '',
        is_public: false,
        materials: ['']
      }
    });
    
    const handleSubmit = async (values) => {
      var project_image = ""
      if (projectImage) {
        try {
          const response = await uploadFile(projectImage);
          console.log('File uploaded successfully', response);
          project_image = response.file_url;
        } catch (error) {
          console.error('Upload error:', error);
          
        }
      } else {
        console.log('No file selected');
        return;
      }
      var pattern_url = ""
      if (patternFile) {
        const respone = await uploadFile(patternFile);
        console.log('File uploaded successfully', respone);
        pattern_url = respone.file_url;
      } else {
        console.log('No file selected');
        return;
      }
      

      try {
        const data = await createProject(values.title, project_image, values.description, pattern_url,values.is_public, values.materials);
        console.log(data);
      } catch (error) {
        console.error('Create project failed', error);
      }
    };



    return (
      <>
        <Group justify="space-between" gap="md">
          <Group justify="center" gap="md">

          <Button 
            variant={selectedStatus === 'planned' ? 'filled' : 'light'}
            onClick={() => handleSelectStatus('planned')}>
            Planned
          </Button>

          <Button 
            variant={selectedStatus === 'active' ? 'filled' : 'light'}
            onClick={() => handleSelectStatus('active')}>
            Active
          </Button>

          <Button 
            variant={selectedStatus === 'completed' ? 'filled' : 'light'}
            onClick={() => handleSelectStatus('completed')}>
            Completed
          </Button>
          <Button 
            variant={selectedStatus === 'createdByYou' ? 'outline' : 'transparent'}
            onClick={() => handleSelectStatus('createdByYou')}>
            
            Created by you
          </Button>
          </Group>
            <Button radius="xl" onClick={open}>Add new project</Button>
        </Group>


        <Modal opened={opened} onClose={close} title="Add new project" centered>
        
          <div>
            <form onSubmit={form.onSubmit(handleSubmit)}>
            <FileInput
              variant="filled"
              radius="md"
              label="Project image"
              description="Upload png or jpeg file"
              placeholder="project.jpg"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />
            <Space h="sm" />
            <TextInput 
              required label="Title" 
              placeholder="Project" 
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            />
            <Space h="sm" />
            <Textarea
              label="Description"
              placeholder="Describe your project"
              onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            />
            <Space h="sm" />

            <FileInput
              variant="filled"
              radius="md"
              label="Pattern file"
              description="Upload png, jpeg or pdf file"
              placeholder="pattern.pdf"
              accept="image/png,image/jpeg,application/pdf"
              onChange={handlePatternChange}
            />

            <Space h="lg" />

            <Switch
              defaultChecked
              label="Want to make your project public?"
              onChange={(event) => form.setFieldValue('is_public', event.currentTarget.checked)}
            />

            <Space h="sm" />

            <Button onClick={handleSubmit}>
              Add project
            </Button>
            
            </form>
          </div>
        
        </Modal>
      </>
    )
  }
  
