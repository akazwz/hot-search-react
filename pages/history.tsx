import { ChangeEvent, FocusEvent, useState } from 'react'
import { addMonths, format, getDay, getDaysInMonth, getMonth, getYear, isValid } from 'date-fns'
import {
  Button,
  Center, Circle, HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, SimpleGrid, Spacer, Square, Text,
  useDisclosure,
} from '@chakra-ui/react'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, } from '@chakra-ui/icons'
import { Layout } from '../src/components/layout'

const History = () => {
  const [dateText, setDateText] = useState<string>('')
  const [date, setDateState] = useState<Date>(new Date())

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setDateText(value)
  }

  // invalid date format will be cleaned up
  const handleInputBLur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const date = new Date(value)
    const valid = isValid(date)
    if (!valid) {
      setDateText('')
      return
    }
  }

  const handleLastMonth = () => {
    const newDate = addMonths(date, -1)
    setDateState(newDate)
  }

  const handleNextMonth = () => {
    const newDate = addMonths(date, 1)
    setDateState(newDate)
  }

  const week = () => {
    return (
      <>
        <Square>
          Sun
        </Square>
        <Square>
          Mon
        </Square>
        <Square>
          Tus
        </Square>
        <Square>
          Wen
        </Square>
        <Square>
          Thurs
        </Square>
        <Square>
          Fri
        </Square>
        <Square>
          Sat
        </Square>
      </>
    )
  }

  const lastMonthDates = (n: number) => {
    let dateArr = []
    for (let i = 0; i < n; i++) {
      dateArr.push(
        <Circle key={'last' + i} size={'40px'}>
          <Button rounded={'full'} isDisabled>
            {i}
          </Button>
        </Circle>
      )
    }
    return (
      <>
        {dateArr}
      </>
    )
  }

  const dates = (n: number) => {
    let dateArr = []
    for (let i = 1; i < n + 1; i++) {
      dateArr.push(
        <Circle key={'dates' + i} size={'40px'}>
          <Button rounded={'full'}>
            {i}
          </Button>
        </Circle>
      )
    }
    return (
      <>
        {dateArr}
      </>
    )
  }

  return (
    <Layout>
      <Center>
        <InputGroup w={'3xs'}>
          <Input
            value={dateText}
            onChange={handleInputChange}
            onBlur={(handleInputBLur)}
          />
          <InputRightElement>
            <IconButton
              aria-label={'show date picker'}
              icon={<CalendarIcon/>}
              onClick={onOpen}
            />
          </InputRightElement>
        </InputGroup>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>
              <HStack>
                <IconButton
                  aria-label={'last month'}
                  icon={<ChevronLeftIcon/>}
                  onClick={handleLastMonth}
                />
                <Spacer/>
                <Text>
                  {getYear(date)}
                  {' Year'}
                </Text>
                <Text>
                  {getMonth(date) + 1}
                  {' Month'}
                </Text>
                <Spacer/>
                <IconButton
                  aria-label={'next month'}
                  icon={<ChevronRightIcon/>}
                  onClick={handleNextMonth}
                />
              </HStack>
            </ModalHeader>
            <ModalBody>
              <SimpleGrid columns={7} spacing={3}>
                {week()}
                {lastMonthDates(getDay(new Date(format(date, 'yyyy-MM-1'))))}
                {dates(getDaysInMonth(date))}
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </Layout>
  )
}

export default History