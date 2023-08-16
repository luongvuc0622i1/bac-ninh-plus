export async function fetchDataFromApi(YOUR_API_URL) {
    const response = await fetch(YOUR_API_URL);
    const fullData = await response.text();
    const cutData = fullData.split(' = ')[1].split('\n').filter(line => !line.trim().startsWith('//')).join('\n');
    const jsonData = JSON.parse(cutData);
    return jsonData;
}