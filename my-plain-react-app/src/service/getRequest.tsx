const apiUrl = process.env.REACT_APP_API_URL;

async function Get(path: string, id?: number ) {
  let url;
    if(id){
      url = `${apiUrl}${path}/${id}`;
    }else{
      url = `${apiUrl}${path}`;
    }
    const response = await fetch(url, {
        method: "GET",
        credentials: "include", // ✅ send cookies (for same-site or CORS)
      });

      if (!response.ok) {
        let errorData = await response.json();
        throw { status: response.status, message: errorData.message };
      }
  
      return response.json();
}
function Post(path: string, payload) {
   return fetch(apiUrl+path, {
    method: "POST",
    credentials: "include",
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });
}
function Edit(path: string, payload) {
   return fetch(apiUrl+path, {
    method: "PUT",
    credentials: "include",
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });
}
async function Delete(path: string) {
  let response = await fetch(apiUrl+path, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    let errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  return await response.text();
}
export {
    Get,
    Post,
    Edit,
    Delete
};