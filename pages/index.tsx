import { useEffect, useState } from 'react'
import { Center, Spinner, Text, VStack } from '@chakra-ui/react'
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

const getHotSearches = async (): Promise<ICurrentHS> => {
  const current = await fetch('https://hs.hellozwz.com/hot-searches/current')
  const json = await current.json()
  const { code, data } = json
  if (code !== 2000) {
  }
  const { time, searches } = data
  return { time, searches }
}

const Home = () => {
  const [currentHS, setCurrentHS] = useState<ICurrentHS | null>(null)

  useEffect(() => {
    getHotSearches().then((res) => {
      setCurrentHS(res)
    })
  }, [])

  if (!currentHS) {
    return (
      <Center w='100vw' h='100vh'>
        <Spinner />
      </Center>
    )
  }
  return (
    <Layout>
      <Center>
        <VStack maxW='xl'>
          <Hero searches={currentHS.searches} />
          <HotList searches={currentHS.searches} />
          <Text fontWeight={'thin'} fontSize={'small'}>
            数据更新日期： {currentHS.time}
          </Text>
        </VStack>
      </Center>
    </Layout>
  )
}

export default Home
