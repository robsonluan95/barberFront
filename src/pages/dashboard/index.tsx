import Head from 'next/head'
import {Flex,Text} from "@chakra-ui/react"

import { canSSRAuth } from '@/src/utils/canSSRAuth'

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>Barber Pro - Minha Barbearia</title>
            </Head>
            <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center" >
                <Text>Bem vindo ao dashboard</Text>
            </Flex>
        </>
    )
}

//Criando controle de rotas
//Aqui é no lado do servidor  
//o canSSRAuth é quem faz a validação

export const getServerSideProps = canSSRAuth (async ()=>{

    return {
        props: {}
    }
})