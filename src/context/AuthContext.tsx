import {createContext,ReactNode,useState,useEffect} from 'react'
import { destroyCookie,setCookie,parseCookies } from 'nookies';
import  Router  from 'next/router';

import {api} from '../services/apiClient'



interface AuthContextData{
    user:UserProps;
    isAuthenticated:boolean;
    signIn:(credentials:SignInProps)=>Promise<void>;
    signUp:(credentials:SignUpProps)=>Promise<void>;
    updateUser:(credentials:UpdateUserProps)=>Promise<void>;
    logoutUser:()=>Promise<void>;
}
interface SignUpProps{
    name:string;
    email:string;
    password:string;

}

interface UserProps{
    id:string;
    name:string;
    email:string;
    endereco:string|null;
    subscriptions?:SubscriptionsProps|null;
   
}
interface SubscriptionsProps{
    id:string;
    status:string;
}

interface AuthProviderProps{
    children:ReactNode;
}

interface SignInProps{
    email:string;
    password:string;
}
export interface UpdateUserProps{
    name:string;
    endereco:string
}

export const AuthContext = createContext({} as AuthContextData )

export function signOut(){
    try {
        destroyCookie(null, '@barber.token',{path:'/'})
        Router.push('/login')
    } catch (error) {
        console.log('Error ao sair')
    }
}


export function AuthProvider({children}:AuthProviderProps){
    const [user,setUser]=useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect (()=>{
        const {'@barber.token':token}=parseCookies();
        if (token){
            api.get('/me').then(response=>{
                const {id,name,endereco,email,subscriptions}=response.data
                setUser({
                    id,name,email,endereco,subscriptions
                })

            }).catch(()=>{
                signOut()
            })
        }
    },[])


    //Função de Login

    async function signIn({email,password}:SignInProps) {
        
        try{
            //Fazemos o login , passando o email senha
            const response = await api.post("/session",{password,email})
            //Pegamos o retorno das informações 
            const{id,name,token,subscriptions,endereco} = response.data
            //setando o cookie duração de 1 mes e em todas as paginas
            setCookie(undefined,'@barber.token',token,{
                maxAge:60*60*24*30,
                path:'/',
            })
            //setamos no usurário as informações que buscamos 
            setUser({id,name,email,endereco,subscriptions})
            
            //colocando o token em todos os headers das requisições 
            api.defaults.headers.common['Authorization']= `Bearer ${token}`

            // rota para dashboard
            Router.push('/dashboard')

        }catch(err){
            if (err.response) {
                console.error("Erro ao fazer login - Resposta da API:", err.response.data);
                console.error("Status Code:", err.response.status);
            } else if (err.request) {
                console.error("Erro ao fazer login - Sem resposta do servidor", err.request);
            } else {
                console.error("Erro ao fazer login - Configuração da requisição", err.message);
            }
        }
    }

    //função de cadastro 

    async function signUp({name,email,password}:SignUpProps){
        try{
            const response = await api.post("/users",{name,email,password})
            Router.push('/login')

        }catch(error){
            console.error("Erro ao cadastrar", error)
        }
        
         
    }
    //Função de Update
    async function updateUser({name,endereco}:UpdateUserProps){
        try{
            const response = await api.put('/meupdate',{name,endereco})
            alert('Dados alterados')
        }catch(error){
            console.log('Error',error)
        }

    }

    async function logoutUser(){
        try{
            destroyCookie(null,'@barber.token',{path:'/'})
            Router.push('/login')
            //as informações dos usuários serão zeradas
            setUser(null)
        }catch(error){
            console.log('Error ao Sair',Error)
        }
    }


    return (
        <AuthContext.Provider value={{isAuthenticated,user,signIn,signUp,logoutUser,updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}