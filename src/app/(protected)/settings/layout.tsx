import { Navbar } from "@/components/ui/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
};
export default Layout;
