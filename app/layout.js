import React from 'react'

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <h1>Spotify Thang</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default RootLayout