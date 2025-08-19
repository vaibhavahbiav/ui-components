import React, { useState } from "react";
import InputField from "./components/InputField";
import DataTable, { Column } from "./components/DataTable";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  type User = { id: number; name: string; email: string };
  const data: User[] = [
    { id: 1, name: "A", email: "a@example.com" },
    { id: 2, name: "B", email: "b@example.com" },
    { id: 3, name: "C", email: "c@example.com" },
    { id: 4, name: "v", email: "v@example.com" },
  ];

  const columns: Column<User>[] = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-6 transition-colors">
        <div className="flex items-center justify-center space-x-5 mt-10">
          <div></div>
          <h1 className="text-3xl lg:text-5xl font-thin tracking-wider underline decoration-2 underline-offset-8 decoration-amber-500 dark:decoration-purple-500">UI Components</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="size-fit p-2 lg:p-3 rounded-sm text-xl bg-gray-950 shadow-md shadow-purple-500 dark:shadow-amber-500 dark:bg-gray-50 hover:scale-110 active:scale-90 transition-all"
          >
            {darkMode ? "🔆" : "🌙"}
          </button>
        </div>

        <div className="flex flex-col items-center space-y-10 lg:justify-center lg:space-y-0 lg:flex-row lg:pace-x-5 mt-40">
          {/* inputs */}
          <div className="px-2 lg:px-10 w-full sm:max-w-[500px] lg:max-w-[800px]">
            <h2 className="text-2xl lg:text-4xl font-thin mb-10 text-center tracking-wider uppercase underline decoration-2 underline-offset-8 decoration-amber-500 dark:decoration-purple-500">input</h2>
            <InputField
              label="Username"
              placeholder="enter your username..."
              helperText="Please enter your username here as it will be used for login."
              disabled={false}
              errorMessage="** Username is incorrect **"
              // size="lg"
            // invalid
            />
            <InputField
              label="Password"
              placeholder="enter your password..."
              helperText="Please enter your account password here."
              errorMessage="**Password is required**"
              type="password"
              // variant="filled"
              // size="lg"
            // invalid
            />
          </div>

          {/* table */}
          <div className="px-2 lg:px-10 w-full sm:max-w-[500px] lg:max-w-[800px]">
            <h2 className="text-2xl lg:text-4xl font-thin mb-10 text-center tracking-wider uppercase underline decoration-2 underline-offset-8 decoration-amber-500 dark:decoration-purple-500">Table</h2>
            <DataTable<User> data={data} columns={columns} selectable />
          </div>
        </div>
        <footer>
          <p className="text-sm text-gray-800 dark:text-gray-300 mt-20 lg:mt-56 text-center tracking-wider">made by <span className="text-amber-500 dark:text-purple-500 underline underline-offset-4">vaibhav</span>.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
