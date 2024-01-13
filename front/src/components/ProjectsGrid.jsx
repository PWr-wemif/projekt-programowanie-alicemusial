import { Container, Grid, Image } from '@mantine/core';



export default function ProjectsGrid() {
  const imageCount = 15;

  const imageUrls = Array.from({ length: imageCount }, (_, index) => `https://picsum.photos/200/200?random=${index}`);

  return (
    <Container my="md">
      <Grid grow gutter="sm">
        {imageUrls.map((url, index) => (
          <Grid.Col span={4} key={index}>
            <Image radius='lg' src={url} alt={`Random Image ${index + 1}`} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

