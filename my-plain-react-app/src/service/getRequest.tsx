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
        throw new Error(`HTTP error! Status: ${response.status}`);
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
function Delete(path: string) {
   return fetch(apiUrl+path, {
    method: "DELETE",
    credentials: "include",
  });
}
export {
    Get,
    Post,
    Edit,
    Delete
};