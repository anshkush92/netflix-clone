import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }: any) => {
  return (
    // For giving padding to the whole Layout ----> px-8 py-4
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
