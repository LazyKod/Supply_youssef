import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GestionCommandes - Système de gestion des commandes',
  description: 'Application de gestion des commandes avec Next.js',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}