import './globals.css'

export const metadata = {
  title: 'Jestrinvestor - Creator Links',
  description: 'All social links and contact information for Jestrinvestor',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
