type AdminLayoutProps = React.ComponentPropsWithoutRef<"div">;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default AdminLayout;
