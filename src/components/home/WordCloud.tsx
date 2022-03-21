import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Wordcloud } from '@visx/wordcloud'
import { Text } from '@visx/text'
import { BaseDatum } from '@visx/wordcloud/lib/types'
import { ISearch } from '../../../pages'

export interface WordData {
  text: string;
  value: number;
}

const colors = ['#143059', '#2F6B9A', '#82a6c2']

export const WordCloudHot = (props: { searches: ISearch[], width: number, height: number }) => {
  const { searches, width, height } = props
  const [wd, setWd] = useState<Map<string, number>>(new Map)
  const [words, setWords] = useState<BaseDatum[]>([])

  useEffect(() => {
    if (!searches) {
      return
    }
    let wdTemp: Map<string, number> = new Map<string, number>()
    let wordsTemp: BaseDatum[] = []
    searches.map(((search) => {
      const text = search.content
      const value = search.rank
      wdTemp.set(text, value)
      wordsTemp.push({ text: text })
    }))
    setWd(wdTemp)
    setWords(wordsTemp)
  }, [searches])

  const getFontSize = (datum: any, index: number) => {
    const { text } = datum
    const value = wd.get(text)
    if (!value) {
      return 20
    }
    switch (true) {
      case value <= 3:
        return 40
      case value <= 10:
        return 30
      case value <= 30:
        return 20
      case value <= 50:
        return 10
      default:
        return 20
    }
  }

  return (
    <Wordcloud
      width={width}
      height={height}
      words={words}
      font={'Impact'}
      spiral='rectangular'
      rotate={0}
      fontSize={getFontSize}
    >
      {(cloudWords) =>
        cloudWords.map((w, i) => (
          <Text
            key={w.text}
            fill={colors[i % colors.length]}
            textAnchor={'middle'}
            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
            fontSize={w.size}
            fontFamily={w.font}
          >
            {w.text}
          </Text>
        ))
      }
    </Wordcloud>
  )
}
