import "./App.css";
import Form from "./components/Form";
import userProfile from "./data/user-profile.json";
import initialData from "./data/initial-profile.json";

function App() {
  return (
    <div
      className="container mx-auto my-20 
    "
    >
      <header className=" text-2xl  md:text-4xl  lg:text-6xl text-bold  md:text-extrabold">
        {userProfile.title}
      </header>
      <Form Schema={userProfile.fields} initialData={initialData} />
    </div>
  );
}

export default App;
