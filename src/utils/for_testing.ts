const reverseStr = (str:string) => {
  return str
    .split('')
    .reverse()
    .join('')
}


const averageNum = (arr:number[]) => {
  const reducer = (sum:number, item:number) => {
    return sum + item
  }

  return arr.length === 0 ? 0 : arr.reduce(reducer,0)  / arr.length
}


export default {
  reverseStr,
  averageNum
}