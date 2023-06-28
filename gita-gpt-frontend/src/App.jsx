import React from "react";
import { Center, ChakraProvider, Container } from "@chakra-ui/react";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <ChakraProvider>
      <Center>
        <QuoteGenerator />
      </Center>
    </ChakraProvider>
  );
}

export default App;
