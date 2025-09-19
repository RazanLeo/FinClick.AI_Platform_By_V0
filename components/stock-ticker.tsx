"use client"

import { useEffect, useState } from "react"

interface StockIndex {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function StockTicker() {
  const [indices, setIndices] = useState<StockIndex[]>([
    { name: "تاسي", symbol: "TASI", price: 12450.5, change: 125.3, changePercent: 1.02 },
    { name: "ناسداك", symbol: "NASDAQ", price: 15234.78, change: -45.2, changePercent: -0.3 },
    { name: "S&P 500", symbol: "SPX", price: 4567.89, change: 23.45, changePercent: 0.52 },
    { name: "داو جونز", symbol: "DJI", price: 34567.12, change: 156.78, changePercent: 0.46 },
    { name: "فوتسي", symbol: "FTSE", price: 7890.45, change: -12.34, changePercent: -0.16 },
    { name: "نيكي", symbol: "NIKKEI", price: 28456.78, change: 234.56, changePercent: 0.83 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((index) => ({
          ...index,
          price: index.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 50,
          changePercent: (Math.random() - 0.5) * 2,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black border-t border-b border-[#B48500] py-2 overflow-hidden">
      <div className="animate-marquee flex gap-8 whitespace-nowrap">
        {indices.concat(indices).map((index, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#B48500]">{index.name}</span>
            <span className="text-[#B48500]">{index.price.toFixed(2)}</span>
            <span className={`${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {index.change >= 0 ? "+" : ""}
              {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
