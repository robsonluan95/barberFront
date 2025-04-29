import Head from "next/head";
import Link from "next/link"
import { Sidebar } from "@/src/componentes/sidebar";
import { IoMdPricetag } from "react-icons/io"
import { setupAPIClient } from "@/src/services/api";

import { canSSRAuth } from "../../utils/canSSRAuth"

import { Flex, Heading, Text, Button, Stack, Switch, useMediaQuery } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";

interface haircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface listHaircutProps {
    haircuts: haircutProps[];
}

export default function Haircuts({ haircuts }: listHaircutProps) {
    const [isMobile] = useMediaQuery("(max-width: 500px)")
    const [haircutList, setHaircutList] = useState(haircuts || [])
    const [disableHaircut,setDisableHaircut]=useState("enabled")


    async function handleDisable(e:ChangeEvent<HTMLInputElement>){
        const api=setupAPIClient();

        if (disableHaircut==="enabled"){

            setDisableHaircut("disabled")
            const response = await api.get("/haircut",{
                params:{
                    status:false
                }
            })

            setHaircutList(response.data)

            
        }else{
            setDisableHaircut("enabled")
            const response = await api.get("/haircut",{
                params:{
                    status:true
                }
            })

            setHaircutList(response.data)
        }
    }

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
                            <Link href='/haircuts/new'>
                                <Button>Cadastrar novo</Button>
                            </Link>

                            <Stack ml='auto' alignItems="center" direction='row'>
                                <Text fontWeight="bold">ATIVOS</Text>
                                <Switch 
                                    colorScheme="green" 
                                    size="lg" 
                                    value={disableHaircut}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>handleDisable(e)}    
                                    isChecked={disableHaircut ==="enabled"?true:false}                               
                                />
                            </Stack>

                        </Flex >



                    </Flex>
                    {haircutList.map(haircut => (
                        <Link key={haircut.id} href={`/haircuts/${haircut.id}`} style={{ width: '100%' }}
                        >
                            <Flex
                                cursor="pointer"
                                w="100%"
                                p={4}
                                bg="barber.400"
                                direction={isMobile ? "column" : "row"}
                                align={isMobile ? "flex-start" : "center"}
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                            >
                                <Flex mb={isMobile ? 2 : 0} direction="row" align="center" justifyContent="center">
                                    <IoMdPricetag size={28} color="#fba931" />
                                    <Text fontWeight="bold" ml={4} noOfLines={2} color="#white" >
                                        {haircut.name}
                                    </Text>

                                </Flex >
                                <Text fontWeight="bold">Preço: R$ {haircut.price}</Text>

                            </Flex>
                        </Link>

                    ))}
                </Flex>
            </Sidebar>
        </>

    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const api = setupAPIClient(ctx)
        const response = await api.get("/haircut", {
            params: {
                status: true
            }
        })
        if (response.data === null) {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false
                }
            }
        }
        
        return {
            props: {
                haircuts:response.data
            }
        }
    } catch (err) {
        console.log(err)
    }
    return {
        redirect: {
            destination: "/dashboard",
            permanent: false
        }
    }
})