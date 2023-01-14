export const fetchProducts = async(token, page, limit) => {
    const response = await fetch(
        `http://localhost:8000/products?_page=${page}&_limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return await response.json();
};