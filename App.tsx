import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { customConfig } from './src/theme';
import { Box, Text, Button } from '@gluestack-ui/themed';

export default function App() {
  return (
    <GluestackUIProvider config={customConfig}>
      <Box flex={1} justifyContent="center" alignItems="center" bg="$background">
        <Text size="xl" mb="$4">
          Hello Gluestack UI!
        </Text>
        <Button>
          <Text>Press me</Text>
        </Button>
      </Box>
    </GluestackUIProvider>
  );
}