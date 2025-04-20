import Head from "next/head";
import Link from "next/link"
import { Sidebar } from "@/src/componentes/sidebar";
import {IoMdPricetag} from "react-icons/io"

import { Flex, Heading, Text, Button, Stack, Switch, useMediaQuery } from "@chakra-ui/react"

export default function Haircuts() {
    const [isMobile] = useMediaQuery("(max-width: 500px)")

    return (
        <>
            <Head>
                <title>Modelos de Cortes - Minha Barbearia</title>
            </Head>
            <Sidebar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w='100%'
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        justifyContent="flex-start"
                        mb={0}
                    >
                        <Heading color="orange.900" fontSize={isMobile ? '28px' : '3xl'} mt={4} mb={4} mr={4} >Minha conta</Heading>

                        <Flex direction='row'
                            w='100%'
                            alignItems='center'
                            justifyContent="flex-start"
                            mb={0}>
                            <Link href='/haircut/new'>
                                <Button>Cadastrar novo</Button>
                            </Link>

                            <Stack ml='auto' alignItems="center" direction='row'>
                                <Text fontWeight="bold">ATIVOS</Text>
                                <Switch colorScheme="green" size="lg" />
                            </Stack>

                        </Flex >
                       


                    </Flex>
                    <Link href="/haircut/123" style={{ width: '100%' }}
                    >
                            <Flex
                                cursor="pointer"
                                w="100%"
                                p={4}
                                bg="barber.400"
                                direction="row"
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                            >
                                <Flex direction="row" align="center" justifyContent="center">
                                    <IoMdPricetag size={28} color="#fba931" />
                                    <Text fontWeight="bold" ml={4} noOfLines={2} color="#white" >
                                        Corte completo
                                    </Text>

                                </Flex >
                                <Text fontWeight="bold">Preço: R$ 59.90</Text>

                            </Flex>
                        </Link>




                </Flex>
            </Sidebar>




        </>

    )
}