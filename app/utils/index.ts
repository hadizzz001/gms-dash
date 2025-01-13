

export async function fetchTemp() { 
    const response = await fetch('/api/posts', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}



export async function fetchTemp1() { 
    const response = await fetch('/api/order', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}


