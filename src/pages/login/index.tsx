import Head from "next/head"
import Image from "next/image"
import logo from '../../../public/logo.svg'
import { Flex,Text,Center,Input, Button } from "@chakra-ui/react"
import Link from "next/link"

export default function Login() {
  return (
    <>
      <Head>
        <title>BarberPro - Faça login pra acessar!</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center" >
        <Flex width={640} direction="column" p={14} rounded={5}>
            <Center p={4} mb={10}>
                <Image src={logo} width={240} quality={100}  objectFit="fill" alt="logo barberpro"/>
                
            </Center>
            <Input mb={3} background="barber.400" variant="filled" placeholder="Email@email.com" type="email"  size="lg"  />
            <Input mb={6} background="barber.400" variant="filled" placeholder="*******" type="password"  size="lg"  />
            
            <Button
                background="button.cta"
                color="gray.900"
                mb={6}
                size="lg"
                _hover={{bg:"#ffb13e"}}
            >
                Acessar
            </Button>
            <Center mt={2}>
                <Link href="/register">
                <Text cursor='pointer' color="gray.500" fontSize="sm">Não tem conta? <strong>Cadastre-se</strong></Text>
                </Link>
            </Center>
        </Flex>
        
      </Flex>
      
    </>
  )
}
