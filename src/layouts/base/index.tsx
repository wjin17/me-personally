type BaseLayoutProps = React.ComponentPropsWithoutRef<"div">;

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default BaseLayout;
