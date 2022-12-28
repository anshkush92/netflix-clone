import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }: any) => {
  return (
    // For giving padding to the whole Layout
    <div>
      <Navbar />
      <main className="px-8 py-2">{children}</main>
      <Footer />
    </div>
  );
};
