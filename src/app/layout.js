import './globals.css';

export const metadata = {
  title: 'Image Uploader With API',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
