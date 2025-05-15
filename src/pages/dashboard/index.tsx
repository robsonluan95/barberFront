import Head from 'next/head'
import { Flex, Text, Heading, Button, Link as ChakraLink, useMediaQuery , useDisclosure } from "@chakra-ui/react"
import Link from 'next/link'
import { IoMdPerson } from "react-icons/io"

import { canSSRAuth } from '@/src/utils/canSSRAuth'
import { Sidebar } from '../../componentes/sidebar'
import { setupAPIClient } from '@/src/services/api'
import { useState } from 'react'
import { ModalInfo } from '@/src/componentes/modal'



export interface ScheduleItem {
    id: string;
    customer: string;
    haircut: {
        id: string;
        name: string;
        price: string | number,
        status: boolean,
        user_id: string;
    };
}

interface DashboardProps {
    schedule: ScheduleItem[]
}
export default function Dashboard({ schedule }: DashboardProps) {
    const [list, setList] = useState(schedule)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [service, setService] = useState<ScheduleItem>()
    const [isMobile] = useMediaQuery("(max-width: 500px)")

    function HandleOpenModal(item:ScheduleItem){
        setService(item)
        onOpen()

    }

    return (
        <>
            <Head>
                <title>Barber Pro - Minha Barbearia</title>
            </Head>
            <Sidebar>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Flex w="100%" direction="row" align="center" justify="flex-start" >

                        <Heading fontSize="3xl" mt={4} mb={4} mr={4}>Agenda</Heading>

                        <Link href='/new'>
                            <Button>Registrar</Button>
                        </Link>
                    </Flex>

                    {list.map(item => (
                        <ChakraLink
                            onClick={()=>HandleOpenModal(item)}
                            key={item.id}
                            w="100%"
                            m={0}
                            p={0}
                            mt={1}
                            bg="transparent"
                            style={{ textDecoration: "none" }}
                        >

                            <Flex
                                w="100%"
                                direction={isMobile ? "column" : "row"}
                                p={4}
                                rounded={4}
                                mb={4}
                                bg="barber.400"
                                justify={isMobile ? "center" : "space-between"}
                                align={isMobile ? "center" : "center"}

                            >
                                <Flex direction="row" mb={isMobile ? 2 : 0} align="center" justify="center">
                                    <IoMdPerson size={28} color='#f1f1f1' />
                                    <Text fontWeight="bold" ml={4} noOfLines={1}>{item?.customer}</Text>
                                </Flex>

                                <Text fontWeight="bold" mb={isMobile ? 2 : 0}>{item?.haircut?.name}</Text>

                                <Text fontWeight="bold" mb={isMobile ? 2 : 0} >{item?.haircut?.price}</Text>
                            </Flex>

                        </ChakraLink>
                    ))}


                </Flex>
            </Sidebar>
            <ModalInfo
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                data={service}
                finishService={async ()=>{}}
            />
        </>
    )
}

//Criando controle de rotas
//Aqui é no lado do servidor
//o canSSRAuth é quem faz a validação

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx)
    try {
        const response = await api.get("/schedule")
        return {
            props: {
                schedule: response.data
            }
        }

    } catch (err) {
        console.log(err)
        return {
            props: {
                schedule: []
            }
        }
    }

})