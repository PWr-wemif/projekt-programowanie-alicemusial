import {Group, Button, Modal,  TextInput, FileInput, Textarea, Switch, Space, Grid, Image, Overlay, ActionIcon, Title, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { uploadFile } from "../api/file";
import { createProject, getPrivateProjects } from "../api/project";
import { useForm } from "@mantine/form";
import PrivateProjectsInfo from "./PrivateProjectsInfo";
import { addUserProject } from "../api/userproject";



export default function Projects() {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedStatus, setSelectedStatus] = useState('active');
    const [privateProjects, setPrivateProjects] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [openedPrivateProjectInfo, {open: openPrivateProjectInfo, close: closePrivateProjectInfo }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
      if (selectedStatus === 'createdByYou') {
        fetchPrivateProjects();
      }
    }, [selectedStatus])

    const fetchPrivateProjects = async () => {
      try {
        const projects = await getPrivateProjects();
        setPrivateProjects(projects);
      } catch (error) {
        console.error('Fetch private projects failed', error);
      }
    };

    const handleMouseEnter = index => {
      setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };


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
        console.log(values)
        const data = await createProject(values.title, project_image, values.description, pattern_url,values.is_public, values.materials);
        console.log(data);
      } catch (error) {
        console.error('Create project failed', error);
      }
    };

    const handleAddProjectToClipboard = async () => {
      if (!selectedProject || !selectedProject._id) {
        console.error('No project selected or project ID is missing');
        return;
      }
    
      try {
        const response = await addUserProject(selectedProject._id);
        console.log('Project added successfully', response);
      } catch (error) {
        console.error('Error adding project to clipboard', error);
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
        <Space h="sm" />
        <PrivateProjectsInfo selectedStatus={selectedStatus} />
          <div>
          <Space h="sm" />
          <Grid grow gutter="sm">
          
            {selectedStatus === 'createdByYou' && privateProjects.map((project, index) => (
              <Grid.Col span={1} key={index}>
                <div 
                  onMouseEnter={() => handleMouseEnter(index)} 
                  onMouseLeave={handleMouseLeave}
                  style={{ position: 'relative', width: "250px", height: "250px" }}
                  onClick={() => {
                    openPrivateProjectInfo();
                    setSelectedProject(project);
                  }}
                >
                  <Image radius='lg' w={"250px"} h={"250px"} src={project.project_image} />
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
                        <IconEye size="xl"/>
                      </ActionIcon>
                      </div>

                      <Overlay radius="lg" color="#000" opacity={0.7}/>
                    </div>
                  )}
                </div>
                </Grid.Col>
            ))}
          </Grid>
          </div>


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
              value={form.values.title}
              required label="Title" 
              placeholder="Project" 
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            />
            <Space h="sm" />
            <Textarea
              value={form.values.description}
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
              checked={form.values.is_public}
              value={form.values.is_public}
              defaultChecked
              label="Want to make your project public?"
              onChange={(event) => form.setFieldValue('is_public', event.currentTarget.checked)}
            />

            <Space h="sm" />

            <Button type="submit">
              Add project
            </Button>
            
            </form>
          </div>
        
        </Modal>

        <Modal radius="lg" opened={openedPrivateProjectInfo} onClose={closePrivateProjectInfo}>
        
        {privateProjects && selectedProject && (
          <>
            <Title order={1}>{selectedProject.title}</Title>
            <Space h="md" />
            <Group justify="center">
              <Image radius="lg" h="250px" w="auto" fit="contain" src={selectedProject.project_image}/>
            </Group>
            <Space h="md" />
            <Title order={5}>Description</Title>
            <Text size="lg">{selectedProject.description}</Text>

            <Group justify="space-between">
              <a href={selectedProject.pattern_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Show pattern</Button>
              </a>
              <Button onClick={handleAddProjectToClipboard} variant="filled">Add project to clipboard</Button>
            </Group>
          </>

        )}
      </Modal>

      </>
    )
  }
  
