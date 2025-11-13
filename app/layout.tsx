export const metadata = {
  title: "Yura Invitation Checker",
  description: "Vérification d'invitations Yura Corporation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "sans-serif", background: "#fafafa", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}