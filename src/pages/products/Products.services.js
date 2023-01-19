const API_URL = 'http://localhost:8000/products/';

export const fetchProducts = async(token, name, page, limit, order = 'asc', maxValue = 0, minValue = 0) => {
    let url = `${API_URL}?_page=${page}&_limit=${limit}`;

    if (order) {
        url += `&_sort=price&_order=${order}`;
    }

    if (maxValue) {
        url += `&price_lte=${maxValue}`;
    }

    if (minValue) {
        url += `&price_gte=${minValue}`;
    }

    if (name) {
        url += `&q=${name}`;
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};