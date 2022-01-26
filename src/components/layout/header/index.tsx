import { Box, HStack, Spacer } from '@chakra-ui/react'
import { Logo } from '../logo'
import { ColorModeToggle } from './ColorModeToggle'
import { NavLinks } from './NavLinks'

export const Header = () => {
  return (
    <Box
      as="header"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="3"
      px={{ base: '4', md: '8' }}
    >
      <HStack>
        <Logo/>
        <Spacer/>
        <NavLinks/>
        <ColorModeToggle/>
      </HStack>
    </Box>
  )
}