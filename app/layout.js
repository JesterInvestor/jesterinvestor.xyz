import './globals.css'

export const metadata = {
  title: 'Jesterinvestor - Creator Links',
  description: 'All social links and contact information for Jesterinvestor',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
