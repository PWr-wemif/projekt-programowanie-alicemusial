import { ActionIcon, Button, Grid, Group, Image, Modal, Overlay, Space, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getUserProjects, updateProjectStatus } from "../api/userproject";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";

import PropTypes from 'prop-types';

export default function PrivateProjectsInfo({ selectedStatus }) {
    const [openedProjectInfo, {open: openProjectInfo, close: closeProjectInfo }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getUserProjects();

                const filteredProjects = projects.filter(project => project.status === selectedStatus);
                    
                setProjects(filteredProjects);
            } catch (error) {
                console.error('Fetch private projects failed', error);
            }
        };

        fetchProjects();
    }, [selectedStatus, selectedProject]);
    
    const handleMouseEnter = index => {
        setHoveredIndex(index);
    };
    
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const changeProjectStatus = async (status) => {
        try {
            updateProjectStatus(selectedProject.id, status);     
            closeProjectInfo();
            setSelectedProject(null);
        } catch (error) {
            console.error('Error updating project status', error);
        }
    }
    
    return (
        <>
            <Grid grow gutter="sm">
            {projects && projects.map((project, index) => (
                <Grid.Col span={1} key={index}>
                    <div 
                    onMouseEnter={() => handleMouseEnter(index)} 
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative', width: "250px", height: "250px" }}
                    onClick={() => {
                        openProjectInfo();
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
            <Modal radius="lg" opened={openedProjectInfo} onClose={closeProjectInfo}>
            {projects && selectedProject && (
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
                {selectedStatus === "active" && (
                    <Button onClick={() => {changeProjectStatus("completed")}} variant="filled">Mark as completed</Button>
                )
                }
                {selectedStatus === "planned" && (
                    <Button onClick={() => {changeProjectStatus("active")}} variant="filled">Mark as active</Button>
                )
                }
                </Group>
            </>

        )}
      </Modal>
    </>
    )
}

PrivateProjectsInfo.propTypes = {
    selectedStatus: PropTypes.string.isRequired,
};
