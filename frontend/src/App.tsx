import { ExitIcon } from "./components/atoms/icons/ExitIcon";
import { MessagesIcon } from "./components/atoms/icons/MessagesIcon";
import { ProductReviewsIcon } from "./components/atoms/icons/ProductReviewsIcon";

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-5xl text-white uppercase hover:text-red-500 transition-colors">
        The Prime Market
      </h1>
      <ProductReviewsIcon />
      <ExitIcon />
      <MessagesIcon />
    </div>
  );
}

export default App
