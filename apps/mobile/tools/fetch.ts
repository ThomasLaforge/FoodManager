export const apiGet = async (path: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`);
    return response.json();
}

export const apiPost = async (path: string, data: any) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}