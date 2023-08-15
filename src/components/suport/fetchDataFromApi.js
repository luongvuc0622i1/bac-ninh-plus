export async function fetchDataFromApi(YOUR_API_URL) {
    const response = await fetch(YOUR_API_URL);
    const responseData = await response.json();
    const base64EncodedString = responseData.content;
    // Replace with your base64-encoded string
    const byteArray = new Uint8Array(
        [...atob(base64EncodedString)].map(char => char.charCodeAt(0))
    );
    const textDecoder = new TextDecoder();
    const valueConverted = textDecoder.decode(byteArray).replace(/'/g, '"').split('\n').filter(line => !line.trim().startsWith('//')).join('\n').split(' = ')[1];
    const decodedString = JSON.parse(valueConverted);
    return decodedString;
}