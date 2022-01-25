import {
  Box,
  List,
  ListItem,
  Text,
  HStack,
} from '@chakra-ui/react'
import { ISearch } from '../../../pages'

export const HotList = (props: { searches: ISearch[] }) => {
  const { searches } = props

  const HotListItems = () => {
    const lists = searches.map((search) => {
      return (
        <ListItem key={search.rank}>
          <HStack>
            <Text
              color={search.rank <= 3 ? '#F24949' : '#F28241'}
              fontWeight={search.rank <= 3 ? 'bolder' : 'normal'}
              fontStyle="italic"
              m={3}
              ml={7}
            >
              {search.rank}
            </Text>
            <Text fontWeight="bold" isTruncated>
              {search.content}
            </Text>
            <Text
              fontWeight={'thin'}
              fontSize={'small'}
            >
              {search.hot}
            </Text>
            <Text
              color={'#F28241'}
              fontSize={'small'}
            >
              {search.tag}
            </Text>
            <Text
              color={search.icon === '新' ? '#4EA4D9' : '#EE2027'}
              fontSize={'small'}
            >
              {search.icon}
            </Text>
          </HStack>
        </ListItem>
      )
    })
    return (
      <>
        {lists}
      </>
    )
  }

  return (
    <Box maxW="5xl">
      <List spacing={3}>
        <ListItem>
          <HotListItems/>
        </ListItem>
      </List>
    </Box>
  )
}