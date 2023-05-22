import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Login() {
    const [show, setshow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick=()=>setshow(!show)
    const login=()=>{
    }
  return (
    <VStack spacing='5px'>

<FormControl id='name' >
    <FormLabel>
    Email
        <Input
        type="email"
placeholder='enter your name'
onChange={e=>setEmail(e.target.value)}
        />
    
    </FormLabel>
</FormControl>

<FormControl id='password' >
    <FormLabel>
    Password
    <InputGroup>
        <Input 
        type={show?"text":"password"}
        placeholder='enter your password'
        onChange={e=>setPassword(e.target.value)}
        />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
{show?'Hide':'Show'}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormLabel>
</FormControl>
<Button 

style={{marginTop:'15'}}
width="100%"
colorScheme='blue'
onClick={login}>Login
</Button>
<Button 

style={{marginTop:'15'}}
width="100%"
colorScheme='orange'
>Guet guest users gredentials
</Button>
</VStack>  
  )
}

export default Login