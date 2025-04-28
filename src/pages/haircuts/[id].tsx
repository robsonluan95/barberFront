import {useState,ChangeEvent} from "react"
import Head from  "next/head"
import {Flex,Text,Heading,useMediaQuery, Button, Input, Stack, Switch} from "@chakra-ui/react"
import { Sidebar } from "@/src/componentes/sidebar"
import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import { setupAPIClient } from "@/src/services/api"

interface HaircutProps{
	id: string;
	name: string;
	price: number|string;
	status: boolean;
	user_id: string;

}

interface SubscriptionProps{
    id: string;
    status:string;
}

interface EditHaircutProps{
    haircut:HaircutProps;
    subscriptions:SubscriptionProps|null;
}


export default function EditHeading({subscriptions,haircut}:EditHaircutProps){
    const [isMobile]=useMediaQuery("(max-width: 500px)")

    const [name,setName] = useState(haircut?.name)
    const [price,setPrice] = useState(haircut?.price)
    const [status,setStatus] = useState(haircut?.status)

    const [disableHaircut,setDisableHaircut] = useState(haircut?.status? "disabled" : "enabled")

    function handleChangeStatus(e:ChangeEvent<HTMLInputElement>){
        
        if(e.target.value==="disabled"){
            setDisableHaircut("enabled")
            setStatus(false)
        }else{
            setDisableHaircut("disabled")
            setStatus(true)
        }
        console.log(disableHaircut)
    }

    async function handleUpdate(){

        if (name === ""|| price=== ""){
            return
        }
        try {
            const api = setupAPIClient()
            await api.put("/haircut",{
                name:name,
                price: parseFloat(price),
                status:status,
                haircut_id:haircut?.id
            })
            alert("Corte atualizado")
            
        } catch (error) {
            console.log(error)
        }
        

       


    }

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
                                value={name }
                                onChange={(e)=>setName(e.target.value)}
                            />

                            <Input
                                placeholder= "Valor do corte"
                                bg="gray.900"
                                mb={3}
                                size="lg"
                                type="number"
                                w="100%"
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            />


                            <Stack mb={6} align="center" direction="row">
                                <Text fontWeight="bold">Desativar corte</Text>
                                <Switch
                                    size="lg"
                                    colorScheme="red"
                                    value={disableHaircut}
                                    isChecked={disableHaircut === "disabled" ? false : true}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChangeStatus(e)}
                                    
                                />
                            </Stack>

                            <Button 
                                mb={6}
                                w="100%"
                                bg="button.cta"
                                color="gray.900"
                                _hover={{bg:"#FFB13e"}}
                                isDisabled={subscriptions?.status !== "active"}
                                onClick={handleUpdate}
                            >
                                Salvar
                            </Button>

                            { subscriptions?.status !== "active" && (
                                <Flex direction="row" align="center" justify="center" >
                                    <Link href="/planos">
                                        <Text fontWeight="bold" mr={1} color="#31fb6a" cursor="pointer">
                                            Seja premium
                                        </Text>
                                    </Link>
                                    <Text>
                                        e tenha todos acessos liberados.
                                    </Text>
                                </Flex>
                            )}
                        </Flex>

                    </Flex>

                </Flex>
                
            </Sidebar>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;
    const api = setupAPIClient(ctx);

    try {
        const check = await api.get("/haircut/check");
        const response = await api.get("haircut/details", {
            params: {
                haircut_id: id
            }
        });

        return {
            props: {
                haircut: response.data,
                subscriptions:check.data?.subscriptions

            }
        };

    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: "/haircuts",
                permanent: false
            }
        };
    }
});
