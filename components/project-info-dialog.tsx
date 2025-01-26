"use client"

import { Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ProjectInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          <Info className="h-5 w-5" />
          <span className="sr-only">Project information</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>关于本项目</DialogTitle>
          <DialogDescription className="mt-2">
            本项目使用了以下开源项目：
          </DialogDescription>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><a href="https://github.com/chanind/hanzi-writer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hanzi-writer</a> - 汉字书写动画和练习</li>
            <li><a href="https://github.com/chanind/hanzi-writer-data" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hanzi-writer-data</a> - 汉字笔画数据</li>
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}