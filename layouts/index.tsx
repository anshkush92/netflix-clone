import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }: any) => {
  return (
    // For giving padding to the whole Layout
    <div className="px-8 py-2">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
