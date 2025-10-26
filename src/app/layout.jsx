import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'CayMark',
  description: 'Vehicle Marketplace and Auction Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}