import {
    Modal,
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Text, 
    Button, 
    Flex
} from "@chakra-ui/react"

import {FiUser,FiScissors} from "react-icons/fi"
import {FaMoneyBillAlt} from 'react-icons/fa'
import { ScheduleItem } from "@/src/pages/dashboard";


interface ModalInfoPRops{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
    data: ScheduleItem;
    finishService:()=> Promise<void>;
}

export function ModalInfo({isOpen,onOpen,onClose,data,finishService}:ModalInfoPRops) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent bg="barber.400">
                <ModalHeader>Proximo</ModalHeader>
                <ModalCloseButton/>
                

                <ModalBody>
                    <Flex align="center" mb={3}>
                        <FiUser size={28} color="#FFb13e" />
                        <Text ml={3} fontSize="2xl" fontWeight="bold" color="white">Robson Luan</Text>
                    </Flex>

                    <Flex align="center" mb={3}>
                        <FiScissors size={28} color="#FFf" />
                        <Text ml={3} fontSize="large" fontWeight="bold" color="white">Corte Completo</Text>
                    </Flex>

                    <Flex align="center" mb={3}>
                        <FaMoneyBillAlt size={28} color="#46ef75" />
                        <Text ml={3} fontSize="large" fontWeight="bold" color="white">R$ 59.90</Text>
                    </Flex>

                    <ModalFooter>
                        <Button
                            bg = "button.cta"
                            _hover={{bg:"#FFb13e"}}
                            color="#FFF"
                            mr={3}
                        >
                            Finalizar Servico
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}