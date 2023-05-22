import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Signup() {
    const [show, setshow] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Confirmpassword, setPasswordConfirm] = useState("");
const [pic, setPic] = useState();

const handleClick=()=>setshow(!show)
const submitHandler=()=>{

}
  return (
<VStack spacing='5px'>
<FormControl id='name' isRequired>
    <FormLabel>
    Name
        <Input
placeholder='enter your name'
onChange={e=>setName(e.target.value)}
        />
    </FormLabel>
</FormControl>
<FormControl id='name' isRequired>
    <FormLabel>
    Email
        <Input
        type="email"
placeholder='enter your name'
onChange={e=>setEmail(e.target.value)}
        />
    
    </FormLabel>
</FormControl>

<FormControl id='password' isRequired>
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
<FormControl id='confirm' isRequired>
    <FormLabel>
  Confirm Password
  <InputGroup>
        <Input
        type={show?"text":"password"}
        placeholder='confirm your password'
        onChange={e=>setPasswordConfirm(e.target.value)}
        />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
{show?'Hide':'Show'}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormLabel>
</FormControl>
<FormControl id='pic' isRequired>
    <FormLabel>
Picture        <Input
        type="file"
        accept='image/*'
onChange={e=>setPic(e.target.files[0])}
        />
    </FormLabel>
</FormControl>
<Button 

style={{marginTop:'15'}}
width="100"
colorScheme='blue'
onClick={submitHandler}>Sign-up</Button>
</VStack>  
)
}

export default Signup