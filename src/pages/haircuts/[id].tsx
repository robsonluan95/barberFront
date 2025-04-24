import Head from  "next/head"
import {Flex,Text,Heading,useMediaQuery, Button, Input, Stack, Switch} from "@chakra-ui/react"
import { Sidebar } from "@/src/componentes/sidebar"
import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"

export default function EditHeading(){
    const [isMobile]=useMediaQuery("(max-width: 500px)")
    return(
        <>
            <Head>
                <title>Editando modelos de corte - BarberPRO</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex 
                        direction={isMobile? "column":"row"}
                        w="100%"
                        alignItems={isMobile?"flex-start":"center"}
                        justifyContent="flex-start"
                        mb={isMobile?4:0}
                    >
                        <Link href="/haircuts">
                            <Button p={4} display="flex" alignItems="center" justifyContent="center" mr={3} bg="gray.400">
                                <FiChevronLeft size={20} color="#fff"/>
                                Voltar
                            </Button>
                        </Link>
                        <Heading color="white" fontSize={isMobile?"22px":"3xl"} 
                        >Editar cortes</Heading>
                    </Flex>

                    <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="barber.400" direction="column" align="center" justify="center">
                        <Heading mb={4} fontSize={isMobile?"22px":"3xl"} >Editar cortes</Heading>
                    
                        <Flex w="85%" direction="column">
                            <Input
                                placeholder="Nome do corte"
                                bg="gray.900"
                                mb={3}
                                size="lg"
                                type="text"
                                w="100%"
                            />

                            <Input
                                placeholder="Valor do corte"
                                bg="gray.900"
                                mb={3}
                                size="lg"
                                type="number"
                                w="100%"
                            />


                            <Stack mb={6} align="center" direction="row">
                                <Text fontWeight="bold">Desativar corte</Text>
                                <Switch
                                    size="lg"
                                    colorScheme="red"
                                />
                            </Stack>

                            <Button 
                                mb={6}
                                w="100%"
                                bg="button.cta"
                                color="gray.900"
                                _hover={{bg:"#FFB13e"}}
                            >
                                Salvar
                            </Button>
                        </Flex>

                    </Flex>

                </Flex>
                
            </Sidebar>
        </>
        
    )
}