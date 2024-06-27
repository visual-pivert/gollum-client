
export function search(from, to_search: string, search_index: string): any[] {
    
    return from.reduce((acc, data) => {
        if(data[search_index].toLowerCase().startsWith(to_search.toLowerCase())) {
            acc = [...acc, data]
        }
        return acc
    }, [])

}