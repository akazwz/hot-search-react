import NextLink from 'next/link'
import {
  HStack,
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const NavLinks = () => {
  const router = useRouter()

  return (
    <HStack
      name="links-container"
      spacing={7}
      fontSize="1.2rem"
      fontWeight="bold"
    >
      <NextLink
        href={'/'}
        locale={router.locale}
        passHref
      >
        <Link>
          Home
        </Link>
      </NextLink>
      <NextLink
        href={'/history'}
        locale={router.locale}
        passHref
      >
        <Link>
          History
        </Link>
      </NextLink>
    </HStack>
  )
}