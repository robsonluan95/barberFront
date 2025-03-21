import Head from "next/head"
import { useContext, useState } from "react"
import Image from "next/image"
import logo from '../../../public/logo.svg'
import { Flex,Text,Center,Input, Button } from "@chakra-ui/react"
import Link from "next/link"
import { AuthContext } from "@/src/context/AuthContext"

export default function Register() {
    const {signUp}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    async function handleRegister(){
      if(name ==='' || email==='' || password===''){
        return;
      }
      setLoading(true)
      try{
        await signUp({name,email,password})
      }catch(error){
        console.error("Error",error)
      }finally{
        setLoading(false)
      }
        
    }
  return (
    <>
      <Head>
        <title>BarberPro - Crie sua conta!</title>
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
                placeholder="Nome da barbearia" 
                type="text"  
                size="lg"  
                value={name}
                onChange={(e) => setName(e.target.value)}
                
                />
            <Input 
                mb={3} 
                background="barber.400" 
                variant="filled" 
                placeholder="Email@email.com" 
                type="email"  
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                />
            <Input 
                mb={6} 
                background="barber.400" 
                variant="filled" 
                placeholder="*******" 
                type="password"  
                size="lg" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            
            <Button
                background="button.cta"
                color="gray.900"
                mb={6}
                size="lg"
                _hover={{bg:"#ffb13e"}}
                onClick={() => handleRegister()}
                isLoading={loading}
            >
                Cadastrar
            </Button>
            <Center mt={2}>
                <Link href="/login">
                <Text cursor='pointer' color="gray.500" fontSize="sm">Já possui uma conta? <strong>Entre</strong></Text>
                </Link>
            </Center>
        </Flex>
        
      </Flex>
      
    </>
  )
}
