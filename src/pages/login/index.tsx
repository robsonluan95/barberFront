import Head from "next/head"
import {useState,useContext} from 'react'
import Image from "next/image"
import logo from '../../../public/logo.svg'
import { Flex,Text,Center,Input, Button } from "@chakra-ui/react"
import Link from "next/link"

import { AuthContext } from "@/src/context/AuthContext"

export default function Login() {
  const {signIn}=useContext(AuthContext)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)


  async function handleLogin(){
    setLoading(true)
    try{
      await signIn({
        email,password
      })
    }catch(err){
      console.error("Erro ao fazer login:", err);
    }finally{
      setLoading(false)
    }
   
  }

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
            <Input 
              mb={3}
              background="barber.400" 
              variant="filled" 
              placeholder="Email@email.com" 
              type="email"  
              size="lg"
              value={email}
              color="white"
              onChange={(e)=>setEmail(e.target.value)}
              />
            <Input 
              mb={6} 
              bg='barber.400' 
              variant="filled" 
              placeholder="*******" 
              type="password"  
              size="lg" 
              value={password}
              color="white"
              onChange={(e)=>setPassword(e.target.value)}
              />
            
            <Button
                background="button.cta"
                color="gray.900"
                mb={6}
                size="lg"
                _hover={{bg:"#ffb13e"}}
                onClick={handleLogin}
                isLoading={loading}
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
