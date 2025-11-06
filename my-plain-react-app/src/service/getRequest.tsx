function Get(url) {
   return fetch(url);
}
function Post(url, payload) {
   return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}
export {
    Get,
    Post
};