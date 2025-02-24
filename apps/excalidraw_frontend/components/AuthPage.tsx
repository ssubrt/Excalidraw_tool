"use client"
import "../app/globals.css";

export function AuthPage({ isSignIn }: { isSignIn: boolean }) {

    


  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 m-4 bg-white rounded-lg shadow-lg w-full max-w-sm fade-in">
        <h2 className="text-2xl text-black font-bold mb-4 text-center">
          {isSignIn ? "Sign Up" : "Sign In"}
        </h2>
        <input
          type="text"
          placeholder="Enter your Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            // Add your sign-in/sign-up logic here
          }}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}