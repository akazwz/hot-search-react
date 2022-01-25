import { Box } from '@chakra-ui/react'
import { WordCloudHot } from './WordCloud'
import { ISearch } from '../../../pages'

export const Hero = (props: { searches: ISearch[] }) => {
  return (
    <Box>
      <Box display={{ base: 'flex', md: 'none' }}>
        <WordCloudHot searches={props.searches} width={350} height={350}/>
      </Box>
      <Box display={{ base: 'none', md: 'flex' }}>
        <WordCloudHot searches={props.searches} width={700} height={350}/>
      </Box>
    </Box>
  )
}
