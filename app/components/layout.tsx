import { ReactNode } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  )
}

