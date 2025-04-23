import Head from "next/head";
import Link from "next/link";
import {Flex, Text,Button, Heading,useMediaQuery,Input} from "@chakra-ui/react"
import { Sidebar } from "@/src/componentes/sidebar";
import {FiChevronLeft} from 'react-icons/fi'

import {canSSRAuth} from "../../../utils/canSSRAuth"
import {setupAPIClient} from "../../../services/api"
import { useState } from "react";
import  Router  from "next/router";


interface NewHaircutProps{
    subscription:boolean;
    count:number;
}

export default function NewHaircut({subscription,count}:NewHaircutProps){
    const [isMobile] = useMediaQuery("(max-width:500px)")
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')

    async function handleRegister(){
       if (name===''||price===''){
            return
        }
        const formattedPrice = parseFloat(price.replace(",", "."))
        try{
            const api = setupAPIClient()
            await api.post("/haircut",{name:name,price:formattedPrice})
            Router.push("/haircuts")
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <Head>
                <title>BarberPro - Novo cortes</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" >
                    <Flex 
                        direction={isMobile?"column":"row"}
                        w="100%"
                        align={isMobile?"flex-start":"center"}
                        mb={isMobile? 4:0}
                    >
                        <Link href="/haircuts">
                            <Button 
                                variant="outline"  
                                color="white" 
                                p={4} 
                                display="flex" 
                                alignItems="center" 
                                justifyItems="center" 
                                mr={4}
                            >
                                <FiChevronLeft/>Voltar
                            </Button>
                        </Link>
                        <Heading
                            color="orange.900"
                            mt={4}
                            mb={4}
                            mr={4}
                            fontSize={isMobile?"28px":"3xl"}
                        >
                            Modelos de Cortes
                        </Heading>
                    </Flex>
                    <Flex
                        direction="column"
                        maxW="700px"
                        bg="barber.400"
                        w="100%"
                        align="center"
                        justify="center"
                        pt={8}
                        pb={8}
                    >
                        <Heading fontSize={isMobile?"22px":"3xl"} color="white" mb={4}>Cadastrar modelo</Heading>
                        <Input 
                            disabled={!subscription && count>=5}  
                            placeholder="Nome do corte" 
                            size="lg" 
                            type="text" 
                            w="85%" 
                            bg="gray.900" 
                            mb={4} 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        <Input 
                            disabled={!subscription && count>=5}   
                            placeholder="Valor do corte" 
                            size="lg" 
                            type="text" 
                            w="85%" 
                            bg="gray.900" 
                            mb={4} 
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            />

                        <Button 
                            disabled={!subscription && count>=5}  
                            w="85%" 
                            size="lg" 
                            color="gray.900" 
                            mb={6} 
                            bg="button.cta" 
                            _hover={{bg:"#FFb13e"}}
                            onClick={handleRegister}
                            
                            >
                            Cadastrar
                        </Button>
                        {!subscription && count>=3 &&(
                            <Flex direction="row" align="center" justifyContent="center">
                                <Text>Você atingiu seu limite de cortes.</Text>
                                <Link href="/planos">
                                    <Text fontWeight="bold" color="#31FB6A" cursor="pointer" ml={2}> Seja premium</Text>
                                </Link>
                            </Flex>
                        )}
                        
                    </Flex>
                   
                    
                </Flex>
            </Sidebar>
            
        </>
    )
}

export const getServerSideProps = canSSRAuth (async (ctx)=>{

    try{
        const apiClient = setupAPIClient(ctx)

        const response = await apiClient.get('/haircut/check')
        const count = await apiClient.get('/haircut/count')
        return {
            props:{
                subscription:response.data.subscriptions?.status === "active"?true:false,
                count: count.data
            }
        }
    }catch(error){
        console.log(error)
        return{
            redirect:{
                destination:'/dashboard',
                permanent:false,
            }
        }
    }


})