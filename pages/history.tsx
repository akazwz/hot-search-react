import { ChangeEvent, FocusEvent, useState } from 'react'
import { addMonths, getMonth, getYear, isValid } from 'date-fns'
import {
  Center, HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer, Text,
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
                />
              </HStack>
            </ModalHeader>
            <ModalBody>
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