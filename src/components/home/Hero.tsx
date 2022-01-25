import { Box } from '@chakra-ui/react'
import { WordCloudHot } from './WordCloud'
import { ISearch } from '../../../pages'

export const Hero = (props: { searches: ISearch[] }) => {
  return (
    <Box>
      <WordCloudHot searches={props.searches} width={350} height={350}/>
    </Box>
  )
}
