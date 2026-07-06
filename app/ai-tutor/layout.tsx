export default function AiTutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden [&+footer]:hidden">
      {children}
    </div>
  );
}
