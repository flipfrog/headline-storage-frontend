'use client'

import { Stack, Heading, Text, Container } from '@chakra-ui/react'

const FirstComponent = ({ firstName }: { firstName: string }) => (
    <Container>
        <Stack spacing={2}>
            <Heading size='md' bg='skyblue' textAlign='center'>Welcome</Heading>
            <Text>Hi {firstName}!</Text>
            <Text>The first chakra UI page.</Text>
        </Stack>
    </Container>
);

export default FirstComponent;
