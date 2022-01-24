import { HStack, Text, } from '@chakra-ui/react'
import { RiWeiboLine } from 'react-icons/ri'

export const Logo = () => {
  return (
    <HStack spacing={3}>
      <RiWeiboLine
        size="37px"
        color="#E53E3E"
      />
      <Text
        bgGradient="linear(to-r,  #FF0080, #00B0FF)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="extrabold"
      >
        HSearch
      </Text>
    </HStack>
  )
}