import { Center } from '@chakra-ui/react'
import { Layout } from '../src/components/layout'
import { Hero } from '../src/components/home/Hero'


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

export async function getStaticProps () {
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
        <Hero searches={searches}/>
      </Center>
    </Layout>
  )
}

export default Home
