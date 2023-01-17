const API_URL = 'http://localhost:8000/products/';

export const fetchProducts = async(token, page, limit, order = 'asc') => {
    let url = `${API_URL}?_page=${page}&_limit=${limit}`;

    if (order) {
        url += `&_sort=price&_order=${order}`;
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};