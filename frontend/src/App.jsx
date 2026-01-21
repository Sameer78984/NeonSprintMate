import StoreDebugger from "./components/dev/StoreDebugger";

function App() {
  return (
    <div>
      {/* This block will only exist when you are coding locally */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 z-50">
          <StoreDebugger />
        </div>
      )}
    </div>
  );
}

export default App;
