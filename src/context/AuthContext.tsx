import {createContext,ReactNode,useState} from 'react'
import { destroyCookie,setCookie } from 'nookies';
import  Router  from 'next/router';

import {api} from '../services/apiClient'



interface AuthContextData{
    user:UserProps;
    isAuthenticated:boolean;
    signIn:(credentials:SignInProps)=>Promise<void>;
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

    async function signIn({email,password}:SignInProps) {
        try{
            //Fazemos o login , passando o email senha
            const response = await api.post("/session",{email,password})
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
            console.error('Erro ao fazer login',err)
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,user,signIn}}>
            {children}
        </AuthContext.Provider>
    )
}