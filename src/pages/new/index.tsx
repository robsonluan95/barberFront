import { Flex, Text, Heading, Button, Input, Select } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import Head from "next/head"
import { Sidebar } from "@/src/componentes/sidebar"
import Link from "next/link"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import { setupAPIClient } from "@/src/services/api"

import { useRouter } from "next/router"

interface HaircutProps {
    id: string;
    name: string;
    price: number;
    status: boolean;
    user_id: string;
}

interface ListHaircutProps {
    haircuts: HaircutProps[];
}
export default function ({ haircuts }: ListHaircutProps) {

    const [customer, setCustomer] = useState('')
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0])
    const router = useRouter()
    function handleChangeSelect(id: string) {
        const haircutItem = haircuts.find(item => item.id === id)
        setHaircutSelected(haircutItem)
    }

    async function handleRegister() {
        const api = setupAPIClient()
        try {
            if (customer ===""){
                alert("Preencha o nome do client ")
                return
            }
            await api.post("/schedule",{
                customer:customer,
                haircut_id:haircutSelected?.id
            })
            router.push("/dashboard")
        } catch (error) {
            console.log(error)
            alert("Erro ao registar")
        }
    }
    return (
        <>
            <Head>
                <title>Teste</title>
            </Head>
            <Sidebar>
                <Flex direction="column" align="flex-start" justify="flex-start">

                    <Flex
                        direction="row"
                        w="100%"
                        align="center"
                        justify="flex-start"
                    >
                        <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
                            Novo corte
                        </Heading>
                    </Flex>

                    <Flex
                        maxW="700px"
                        pt={8}
                        pb={8}
                        width="100%"
                        direction="column"
                        align="center"
                        justify="center"
                        bg="barber.400"
                    >

                        <Input
                            placeholder="Nome do cliente"
                            w="85%"
                            mb={3}
                            size="lg"
                            type="text"
                            bg="barber.900"
                            value={customer}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setCustomer(e.target.value) }}
                        />

                        <Select bg="barber.900" mb={3} size="lg" w="85%" onChange={(e) => handleChangeSelect(e.target.value)}>

                            {haircuts.map((haircut) => (
                                <option key={haircut?.id} value={haircut?.id} style={{backgroundColor:"#ececec", color:'#000'}} >{haircut.name}</option>
                            ))}

                        </Select>

                        <Button
                            w="85%"
                            size="lg"
                            color="gray.900"
                            bg="button.cta"
                            _hover={{ bg: "#FFb13e" }}
                            onClick={handleRegister}

                        >
                            Cadastrar
                        </Button>
                    </Flex>



                </Flex>

            </Sidebar>

        </>
    )

}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const api = setupAPIClient(ctx)
    try {
        const response = await api.get("/haircut", {
            params: {
                status: true,
            }
        })

        if (response.data === null) {

        }
        return {
            props: {
                haircuts: response.data
            }
        }
    } catch (err) {
        console.log(err)
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false
            }
        }

    }
})