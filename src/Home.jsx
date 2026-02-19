import { useEffect } from "react";
import { getAccessToken } from "./services/amadeus";

function Home() {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await getAccessToken();
        console.log("ACCESS TOKEN:", token);
      } catch (error) {
        console.log("Auth failed");
      }
    };

    authenticate();
  }, []);

  return (
    <div>
      <h1>Travel Planner</h1>
    </div>
  );
}

export default Home;
