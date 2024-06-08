import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Image, Spinner } from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">MidJourney AI Bot</Text>
        <Input placeholder="Enter your prompt here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <Button leftIcon={<FaTelegramPlane />} colorScheme="teal" onClick={handleGenerateImage} isLoading={loading}>
          Generate Image
        </Button>
        {loading && <Spinner />}
        {imageUrl && <Image src={imageUrl} alt="Generated AI Image" />}
      </VStack>
    </Container>
  );
};

export default Index;
