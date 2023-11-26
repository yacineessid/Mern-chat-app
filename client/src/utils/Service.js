export const baseUrl='http://localhost:3700/api'

export const postRequest=async(url,body)=>{
    const response = await fetch(url, {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(body),
      });
      
    
            const data= await response.json()
            if(!response.ok){
                let message
                if(data?.message){
                    message = data.message
                }
                else{
                    message=data
                }
return {error:true,message}            
}
return data

            }
            export const getRequest = async (url) => {
                const res = await fetch(`${baseUrl}${url}`);
                const data = await res.json();
                if (data.error) {
                    let message = 'An error occurred...';
                    if (data?.message) {
                        message = data.message;
                    }
                    return { error: true, message };
                }
return data;
            };