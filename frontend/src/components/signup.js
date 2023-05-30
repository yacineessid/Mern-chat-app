import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import {useHistory} from 'react-router-dom'
function Signup() {
    const [show, setshow] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Confirmpassword, setPasswordConfirm] = useState("");
const [pic, setPic] = useState();
const [loading,setLoading]=useState(false)
const toast = useToast()

const history=useHistory()

const handleClick=()=>setshow(!show)
const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !Confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== Confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dvrn5sl2d");
      fetch("https://api.cloudinary.com/v1_1/dvrn5sl2d/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

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
        onChange={(e) => postDetails(e.target.files[0])}        />
    </FormLabel>
</FormControl>
<Button 

style={{marginTop:'15'}}
width="100"
colorScheme='blue'
onClick={submitHandler}
isLoading={loading}
>Sign-up</Button>
</VStack>  
)
}

export default Signup