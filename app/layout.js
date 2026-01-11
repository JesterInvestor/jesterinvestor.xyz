import './globals.css'

export const metadata = {
  title: 'Jesterinvestor - Creator Links',
  description: 'All social links and contact information for Jesterinvestor',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
