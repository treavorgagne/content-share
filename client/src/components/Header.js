import React from 'react';
import { Stack, Link, Button, Heading, Box, HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FaGithub } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';

export function Header() {
  return (
    <Stack w="100%" direction={'row'} justify="space-between">
      <Box>
        <Link
          href="https://github.com/treavorgagne?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button p={0} bg={'none'}>
            <FaGithub size={24} />
          </Button>
        </Link>
      </Box>
      <Box>
        <HStack>
          <Link style={{ textDecoration: 'none' }} bg={'none'} href="/">
            <Heading
              textAlign={['left', 'center', 'center']}
              fontWeight={'500'}
              fontSize={['28px', '36px', '40px', '54px']}
              color={'teal'}
              pb={'3'}
            >
              Recipes.io
            </Heading>
          </Link>
          <Button p={0} bg={'none'}>
            <Link href="/add">
              <AiFillPlusCircle color={'teal'} size={32} />
            </Link>
          </Button>
        </HStack>
      </Box>
      <Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Stack>
  );
}
