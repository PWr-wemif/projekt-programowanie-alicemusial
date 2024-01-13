import { Space } from "@mantine/core";
import Header from "../components/Header";
import ProjectsGrid from "../components/ProjectsGrid";

const Home = () => {
  return (
    <>
      <Header />
      <Space h="100px" />

      <ProjectsGrid />
    </>
  )
};

export default Home;