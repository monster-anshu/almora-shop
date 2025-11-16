const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <div>
        <p className="text-muted-foreground text-sm">Account</p>
        <h1 className="text-3xl font-semibold">Manage your experience</h1>
      </div>
      {children}
    </div>
  );
};

export default AccountLayout;
