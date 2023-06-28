import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { backendURL } from "../backendURL";

const QuoteGenerator = () => {
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerateQuote = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${backendURL}/api/quote`, { input });
      setQuote(response.data.quote);
      setInput("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating quote:", error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerateQuote();
    }
  };

  return (
    <Box p={4} bg="gray.100" rounded="md" w="400px">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="md" textAlign="center">
          Gita Quote Generator
        </Heading>
        <Input
          placeholder="Enter a word"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme="teal" onClick={handleGenerateQuote}>
          Generate Quote
        </Button>
        {isLoading ? (
          <Box
            h="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="lg" color="teal.500" />
          </Box>
        ) : quote ? (
          <VStack spacing={4} align="stretch" bg="gray.200" p={4} rounded="md">
            {quote.split("\n\n").map((line, index) => (
              <Text
                key={index}
                fontStyle="italic"
                bg="white"
                p={2}
                rounded="md"
              >
                {line}
              </Text>
            ))}
          </VStack>
        ) : null}
      </VStack>
    </Box>
  );
};

export default QuoteGenerator;
