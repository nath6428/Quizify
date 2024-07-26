import Navbar from '@/components/Navbar'
import React from 'react'

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <div>Hello</div>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default RootLayout