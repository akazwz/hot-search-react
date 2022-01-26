import {
  ChangeEvent,
  FocusEvent,
  useState,
} from 'react'
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isValid
} from 'date-fns'
import {
  Button,
  Center, Circle, Editable, EditableInput, EditablePreview, HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Square,
  Text,
  useDisclosure, VStack,
} from '@chakra-ui/react'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
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
    const days = getDaysInMonth(addMonths(date, -1))
    for (let i = 0; i < n; i++) {
      dateArr.push(
        <Circle key={'last' + i} size={'40px'}>
          <Button rounded={'full'} isDisabled>
            {days - i}
          </Button>
        </Circle>
      )
    }
    return (
      <>
        {dateArr.reverse()}
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

  const nextMonthDates = (n: number) => {
    let dateArr = []
    for (let i = 1; i <= n; i++) {
      dateArr.push(
        <Circle key={'next' + i} size={'40px'}>
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
          <ModalOverlay w={'100%'} h={'100%'}/>
          <ModalContent maxW={'sm'} p={3}>
            <ModalHeader>
              <HStack spacing={7}>
                <Editable defaultValue={getYear(date).toString()}>
                  <EditablePreview
                    fontWeight={'bold'}
                    fontSize={'xx-large'}
                  />
                  <EditableInput
                    max={4}
                    type={'number'}
                  />
                </Editable>
                <Spacer/>
                <HStack>
                  <IconButton
                    aria-label={'last month'}
                    icon={<ChevronLeftIcon/>}
                    onClick={handleLastMonth}
                  />
                  <Spacer/>
                  <VStack>
                    <Text>
                      {getMonth(date) + 1}
                    </Text>
                  </VStack>
                  <Spacer/>
                  <IconButton
                    aria-label={'next month'}
                    icon={<ChevronRightIcon/>}
                    onClick={handleNextMonth}
                  />
                </HStack>
              </HStack>
            </ModalHeader>
            <ModalBody>
              <SimpleGrid columns={7} spacing={3}>
                {week()}
                {lastMonthDates(getDay(new Date(format(date, 'yyyy-MM-1'))))}
                {dates(getDaysInMonth(date))}
                {nextMonthDates(42 - (getDay(new Date(format(date, 'yyyy-MM-1'))) + getDaysInMonth(date)))}
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <HStack w={'100%'}>
                <Button variant={'ghost'}>
                  Today
                </Button>
                <Spacer/>
                <Button onClick={onClose}>
                  Cancel
                </Button>
                <Button>
                  OK
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </Layout>
  )
}

export default History