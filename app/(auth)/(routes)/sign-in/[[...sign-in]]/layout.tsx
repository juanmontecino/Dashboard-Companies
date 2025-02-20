
export default function LayoutAuth({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col justify-center h-full items-center">
        <p>Juan Montecino Dashboard</p>logo
            <h1 className="text-3xl my-2">Welcome to my dashboard</h1>
            <h2 className="text-2xl mb-3"></h2>
          {children} 
      </div>
    )
  }
  