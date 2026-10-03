/** Re-mounts on every navigation, giving each page a subtle entrance (disabled under reduced motion). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
