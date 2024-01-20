import { ActionIcon, Button, Container, Grid, Group, Image, Modal, Overlay, Space, Text, Title } from "@mantine/core";
import Header from "../components/Header";
import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getPublicProjects } from "../api/project";
import { useDisclosure } from "@mantine/hooks";
import { addUserProject } from "../api/userproject";

const Home = () => {
  const [publicProjects, setPublicProjects] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openedProjectInfo, {open: openProjectInfo, close: closeProjectInfo }] = useDisclosure(false);
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    fetchPublicProjects();
  }, [])

  const fetchPublicProjects = async () => {
    try {
      const projects = await getPublicProjects();
      setPublicProjects(projects);
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
      <Header />
      <Space h="100px" />

      <Container my="md">
        <Grid grow gutter="sm">
          {publicProjects && publicProjects.map((project, index) => (
            <Grid.Col span={1} key={index}>

            <div 
              onMouseEnter={() => handleMouseEnter(index)} 
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', width: "300px", height: "300px" }}
              onClick={() => {
                openProjectInfo();
                setSelectedProject(project);
              }} 
            >
              <Image radius='lg' w={"300px"} h={"300px"} src={project.project_image} />
              
              
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



      </Container>
      <Modal radius="lg" opened={openedProjectInfo} onClose={closeProjectInfo}>
        
        {publicProjects && selectedProject && (
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
};

export default Home;