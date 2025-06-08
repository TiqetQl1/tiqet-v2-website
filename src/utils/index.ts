export function truncateAddress(address: string, count: number =4) {
    return `${address.slice(0, count+2)}...${address.slice(-count)}`;
}

export const bigIntToFixed = (value: bigint|number, decimals: bigint|number): string => {
  decimals = Number(decimals)
  const strValue = value.toString(); // Convert to string
  const padded = strValue.padStart(decimals + 1, "0"); // Add leading zeros if necessary
  const whole = padded.slice(0, -decimals); // Whole part
  const fractional = padded.slice(-decimals); // Fractional part
  let res = `${whole}.${fractional}`
  let i=res.length-1
  while (res[i]=='0') {
    res = res.slice(0,-1)
    i-=1
  }
  if (res[i]=='.') {
    res = res.slice(0,-1)
  }
  return res;
}

export const preventContextMenu 
  = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  event.preventDefault();
  event.stopPropagation();
  return false;
}

export type TimeSegments = {
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
}
export const formatTime = (time: number) : TimeSegments => {
  const days    = String(Math.floor(time / 3600 / 24 ))
  const hours   = String(Math.floor(time / 3600) % 24).padStart(2,"0")
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
  const seconds = String(Math.floor(time % 60)).padStart(2, "0")
  return {days, hours, minutes, seconds};
}