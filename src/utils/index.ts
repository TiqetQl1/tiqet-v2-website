export function truncateAddress(address: string, count: number =4) {
    return `${address.slice(0, count+2)}...${address.slice(-count)}`;
}