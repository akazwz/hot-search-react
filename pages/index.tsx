import { Center, Text, VStack } from '@chakra-ui/react'
import { Layout } from '../src/components/layout'
import { Hero } from '../src/components/home/Hero'
import { HotList } from '../src/components/home/HotList'

export interface ISearch {
  rank: number,
  content: string,
  link: string,
  hot: number,
  tag: string,
  icon: string,
}

export interface ICurrentHS {
  time: string,
  searches: ISearch[],
}

export async function getServerSideProps () {
  const current = await fetch('https://hs.hellozwz.com/hot-searches/current')
  const json = await current.json()
  const { code, data } = json
  if (code !== 2000) {
    return
  }
  const { time, searches } = data
  const currentHS: ICurrentHS = { time, searches }
  return {
    props: {
      currentHS,
    }
  }
}

const Home = (props: { currentHS: ICurrentHS }) => {
  const { currentHS } = props
  const time = currentHS.time
  const searches = currentHS.searches
  return (
    <Layout>
      <Center>
        <VStack maxW="xl">
          <Hero searches={searches}/>
          <HotList searches={searches}/>
          <Text fontWeight={'thin'} fontSize={'small'}>
            数据更新日期： {time}
          </Text>
        </VStack>
      </Center>
    </Layout>
  )
}

export default Home
