export function redirect(location, message, headers = new Headers()){
    headers.set("location", location);
    return new Response(null, {headers, status: 303})
}